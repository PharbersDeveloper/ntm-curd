"use strict"
import axios from "axios"
import express from "express"
import * as fs from "fs"
import * as yaml from "js-yaml"
import API, { ResourceTypeRegistry } from "json-api"
import { APIControllerOpts } from "json-api/build/src/controllers/API"
import { JsonConvert, ValueCheckingMode } from "json2typescript"
import mongoose = require("mongoose")
import Kafka from "node-rdkafka"
import { ServerConf } from "../configFactory/serverConf"
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
    private kafka = Kafka

    public exec() {
        this.loadConfiguration()
        this.configMiddleware()
        this.connect2MongoDB()
        this.generateRoutes(this.getModelRegistry())
        this.listen2Port(8080)
    }

    protected configMiddleware() {
        this.app.use("/", this.router)

        // a middleware function with no mount path. This code is executed for every request to the router
        
        this.router.use((req, res, next) => {
            // Kafka Producer Demo
            // const producer = new Kafka.Producer({
            //     "client.id": "ntm-curd",
            //     "dr_cb": true,
            //     "metadata.broker.list": "192.168.100.174:29091",
            //     // 'compression.codec': 'gzip',
            //     // 'retry.backoff.ms': 200,
            //     // 'message.send.max.retries': 10,
            //     // 'socket.keepalive.enable': true,
            //     // 'queue.buffering.max.messages': 100000,
            //     // 'queue.buffering.max.ms': 1000,
            //     // 'batch.num.messages': 1000000,
            // })

            // // Connect to the broker manually
            // producer.connect()

            // // Wait for the ready event before proceeding
            // producer.on("ready", () => {
            //     try {
            //         producer.produce(
            //         // Topic to send the message to
            //         "test",
            //         // optionally we can manually specify a partition for the message
            //         // this defaults to -1 - which will use librdkafka's default partitioner
            //         // (consistent random for keyed messages, random for unkeyed messages)
            //         null,
            //         // Message to send. Must be a buffer
            //         Buffer.from("balabala1"),
            //         // for keyed messages, we also specify the key - note that this field is optional
            //         null,
            //         // you can send a timestamp here. If your broker version supports it,
            //         // it will get added. Otherwise, we default to 0
            //         Date.now(),
            //         // you can send an opaque token here, which gets passed along
            //         // to your delivery reports
            //         (err: any, offset: any) => {
            //             PhLogger.error(err)
            //             PhLogger.error(offset)
            //         })
            //     } catch (err) {
            //         PhLogger.error("A problem occurred when sending our message")
            //         PhLogger.error(err)
            //     }
            // })

            // // Any errors we encounter, including connection errors
            // producer.on("event.error", (err) => {
            //     PhLogger.error("Error from producer")
            //     PhLogger.error(err)
            // })
            
            
            // token验证请求及返回处理
            const auth = req.get("Authorization")
            if (auth === undefined) {
                PhLogger.error("no auth")
                res.status(500).send({error: "no auth!"})
                return
            }

            const host = this.conf.env.oauthHost
            const port = this.conf.env.oauthPort
            const namespace = this.conf.env.oauthApiNamespace

            axios.post(`http://${host}:${port}/${namespace}/TokenValidation`, null, {
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
