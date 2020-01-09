"use strict"
import axios from "axios"
import bodyParser from "body-parser"
import express from "express"
import * as fs from "fs"
import * as yaml from "js-yaml"
import API, { ResourceTypeRegistry } from "json-api"
import { APIControllerOpts } from "json-api/build/src/controllers/API"
import { JsonConvert, ValueCheckingMode } from "json2typescript"
import mongoose = require("mongoose")
import { ServerConf } from "../configFactory/serverConf"
import ExportProejct from "../exportProject/ExportProject"
import KafkaDelegate from "../kafka/KafkaDelegate"
import PhLogger from "../logger/phLogger"
import { urlEncodeFilterParser } from "./urlEncodeFilterParser"

/**
 * The summary section should be brief. On a documentation web site,
 * it will be shown on a page that lists summaries for many different
 * API items.  On a detail page for a single item, the summary will be
 * shown followed by the remarks section (if any).
 *
 */
export default class AppDelegate {

    /**
     * @returns the configuration of the server
     */
    public get Conf(): ServerConf {
        return this.conf
    }

    private conf: ServerConf
    private app = express()
    private router = express.Router()
    private exportHandler: ExportProejct = null
    private kafka: KafkaDelegate = null // new KafkaDelegate()

    public exec() {
        this.loadConfiguration()
        this.configMiddleware()
        this.connect2MongoDB()
        this.generateRoutes(this.getModelRegistry())
        this.listen2Port(8080)
    }

    protected uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0
            const v = c === "x" ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }

    protected configMiddleware() {

        this.app.use(bodyParser.json())
        this.app.use( bodyParser.urlencoded( {
            extended: true
        } ) )

        // a middleware function with no mount path. This code is executed for every request to the router
        this.router.use((req, res, next) => {
            const auth = req.get("Authorization")
            if (auth === undefined) {
                PhLogger.error("no auth")
                res.status(500).send({error: "no auth!"})
                return
            }

            const host = this.conf.env.oauthHost
            const port = this.conf.env.oauthPort
            const namespace = this.conf.env.oauthApiNamespace

            axios.post(`http://${host}${port}/${namespace}/TokenValidation`, null, {
                headers: {
                    Authorization: auth,
                },
            }).then((response) => {
                if (response.data.error !== undefined) {
                    PhLogger.error("auth error")
                    res.status(500).send(response.data)
                    return
                } else {
                    next()
                }
            }).catch((error) => {
                PhLogger.error("auth error")
                res.status(500).send(error)
                return
            })
        })

        this.router.post("/callR", (req, res, next) => {

            // 临时R计算
            let configFile = ""

            if (req.body.type === "tm") {
                configFile = "pharbers-resources/TM_Submit_New.json"
            } else if (req.body.type === "ucb") {
                configFile = "pharbers-resources/UCB_Submit_New.json"
            } else {
                PhLogger.warn("unkonwn calc type!")
                configFile = ""
            }

            const httpCallRUrl = this.conf.env.httpCallRUrl
            const uuid = this.uuidv4()

            axios.post(httpCallRUrl, {
                jobId: uuid,
                processConfig: configFile,
                processConfigType: "json",
                processLocation: "oss",
                replace: {
                    jobId: uuid,
                    periodId: req.body.periodId,
                    phase: req.body.phase,
                    projectId: req.body.projectId,
                    proposalId: req.body.proposalId,
                },
            }).then((response) => {
                PhLogger.info("R ok")
                res.status(200).send(response.data)
                return
            }).catch((error) => {
                PhLogger.error("R error")
                PhLogger.error(error)
                res.status(500).send(error)
                return
            })
        })

        // Add routes for export data to excel
        const exportRoute = "/export/:projectId/phase/:phase"
        const exportInputRoute = "/exportInput/:projectId/phase/:phase"
        this.router.get(exportRoute, async (req, res) => {
            res.json({
                jobId : await this.exportHandler.export2OssWithProject(req.params.projectId, req.params.phase, true)
            })
        } )
        this.router.get(exportInputRoute, async (req, res) => {
            res.json({
                // tslint:disable-next-line: max-line-length
                jobId : await this.exportHandler.export2OssWithProject(req.params.projectId, req.params.phase, false)
            })
        } )

        // Add kafka producer
        // const kfkTestRoute = "/kfk"
        // this.router.get(kfkTestRoute, async (req, res) => {
        //     const value = { "records": [ { "value" : { "test" : "alfred test" } } ] }
        //     this.kafka.pushMessage(value)
        //     res.json( {
        //         jobId: "heiheihei"
        //     } )
        // } )

        this.app.use("/", this.router)
    }

    protected loadConfiguration() {
        try {
            const path = process.env.PH_TS_SERVER_HOME + "/conf"
            const jsonConvert: JsonConvert = new JsonConvert()
            const doc = yaml.safeLoad(fs.readFileSync(path + "/server.yml", "utf8"))
            // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
            jsonConvert.ignorePrimitiveChecks = false // don't allow assigning number to string etc.
            jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
            this.conf = jsonConvert.deserializeObject(doc, ServerConf)
            this.exportHandler = new ExportProejct(this.conf.oss)
            this.kafka = new KafkaDelegate(this.conf.kfk)
        } catch (e) {
            PhLogger.fatal( e as Error )
        }
    }

    protected generateModels(): any {
        const prefix = "/dist/src/models/"
        const path = process.env.PH_TS_SERVER_HOME + prefix
        const suffix = ".js"
        const result: {[index: string]: any} = {}
        this.conf.models.forEach((ele) => {
                const filename = path + ele.file + suffix
                const one = require(filename).default
                result[ele.file] = new one().getModel()
            })
        return result
    }

    protected connect2MongoDB() {
        const prefix = this.conf.mongo.algorithm
        const host = this.conf.mongo.host
        const port = `${this.conf.mongo.port}`
        const username = this.conf.mongo.username
        const pwd = this.conf.mongo.pwd
        const coll = this.conf.mongo.coll
        const auth = this.conf.mongo.auth
        if (auth) {
            PhLogger.info(`connect mongodb with ${ username } and ${ pwd }`)
            mongoose.connect(prefix + "://" + username + ":" + pwd + "@" + host + ":" + port + "/" + coll,
                { useNewUrlParser: true },
                (err) => {
                    if (err != null) {
                        PhLogger.error(err)
                    }
                })
        } else {
            PhLogger.info(`connect mongodb without auth`)
            mongoose.connect(prefix + "://" + host + ":" + port + "/" + coll, { useNewUrlParser: true }, (err) => {
                if (err != null) {
                    PhLogger.error(err)
                }
            })
        }
    }

    protected getModelRegistry(): ResourceTypeRegistry {
        const result: {[index: string]: any} = {}
        this.conf.models.forEach((ele) => {
            result[ele.reg] = {}
        })
        return new API.ResourceTypeRegistry(result, {
            dbAdapter: new API.dbAdapters.Mongoose(this.generateModels()),
            info: {
                description: "Blackmirror inc. Alfred Yang 2019"
            },
            urlTemplates: {
                self: "/{type}/{id}"
            },
        })
    }

    protected generateRoutes(registry: ResourceTypeRegistry) {

        const opts: APIControllerOpts = {
            filterParser: urlEncodeFilterParser
        }

        const Front = new API.httpStrategies.Express(
            new API.controllers.API(registry, opts),
            new API.controllers.Documentation(registry, {name: "Pharbers API"})
        )

        PhLogger.startConnectLog(this.app)
        this.app.get("/", Front.docsRequest)
        const perfix = "/:type"
        const ms = this.conf.models.map((x) => x.reg).join("|")
        const suffix = "/:id"

        const all = perfix + "(" + ms + ")"
        const one = all + suffix
        const relation = one + "/relationships/:relationship"

        // Add routes for basic list, read, create, update, delete operations
        this.app.get(all, Front.apiRequest)
        this.app.get(one, Front.apiRequest)
        this.app.post(all, Front.apiRequest)
        this.app.patch(one, Front.apiRequest)
        this.app.delete(one, Front.apiRequest)

        // Add routes for adding to, removing from, or updating resource relationships
        this.app.post(relation, Front.apiRequest)
        this.app.patch(relation, Front.apiRequest)
        this.app.delete(relation, Front.apiRequest)
    }

    protected listen2Port(port: number) {
        // start the Express server
        this.app.listen( port, () => {
            PhLogger.info( `server started at http://localhost:${ port }` )
        } )
    }
}
