"use strict"
import OSS from "ali-oss"
import project from "ramda/es/project"
import uuidv4 from "uuid/v4"
import XLSX = require("xlsx")
import { OssConf } from "../configFactory/ossConf"
import PhLogger from "../logger/phLogger"
import Hospital from "../models/Hospital"
import Period from "../models/Period"
import Preset from "../models/Preset"
import Product from "../models/Product"
import Project from "../models/Project"
import Proposal from "../models/Proposal"
import Report from "../models/Report"
import Resource from "../models/Resource"

export default class ExportProejct {

    private client: OSS = null
    private localPath: string = process.env.PH_TS_SERVER_HOME + "/tmp/"
    private exportDir: string = "tm-export/"
    private suffix: string = ".xlsx"

    constructor(oss: OssConf) {
        if (oss) {
            this.client = new OSS({
                accessKeyId: oss.accessKeyId,
                accessKeySecret: oss.accessKeySecret,
                bucket: oss.bucket,
                region: oss.region,
            })
        }
    }

    public async pushResult2OSS(jobId: string) {
        if (this.client) {
            try {
                const r1 =
                    await this.client.put(this.exportDir + jobId + this.suffix, this.localPath + jobId + this.suffix)
                PhLogger.info("put success: %j", r1)
                // let r2 = await this.client.get('object');
                // console.log('get success: %j', r2);
            } catch (err) {
                PhLogger.info("error: %j", err)
            }
        }
    }

    public formatPhaseToStringDefault( date: any ) {
        const year = date.getFullYear()
        const month = date.getMonth()
        let season = ""

        switch ( true ) {
        case month < 3:
            season = "Q1"
            break
        case month < 6:
            season = "Q2"
            break
        case month < 9:
            season = "Q3"
            break
        default:
            season = "Q4"
            break
        }
        return `${year}${season}`
    }

    public formatPhaseToDate( OriginBasePhase: any, step: any, phase: any ) {

        const basePhase = new Date( OriginBasePhase )
        const year = basePhase.getFullYear()
        const month = basePhase.getMonth()
        const date = basePhase.getDate()
        let newYear = year
        let newMonth = month
        let newDate = date
        const unit = step.slice( -1 )
        const stepNum = parseInt( step, 10 )

        if ( ["y", "Y"].includes( unit ) ) {
            newYear = year + stepNum * phase
            basePhase.setFullYear( newYear )
        } else if ( ["m", "M"].includes( unit ) ) {
            newMonth = month + stepNum * phase
            basePhase.setMonth( newMonth )
        } else if ( ["w", "W"].includes( unit ) ) {
            newDate = date + stepNum * 7 * phase
            basePhase.setFullYear( newYear )
        } else if ( ["d", "D"].includes( unit ) ) {
            newDate = date + stepNum * phase
            basePhase.setDate( newDate )
        }

        return basePhase
    }

    public async export2OssWithProject(projectId: string, phase: string): Promise<any> {
        /**
         * 1. 找到当前Project下的，phase周期
         */
        const pm = new Project().getModel()
        const perm = new Period().getModel()

        const curProject = await pm.findById(projectId).exec()
        const currentPhase = parseInt(phase, 10)
        const periodId = curProject.periods[currentPhase]
        const curPeriod = await perm.findById(periodId).exec()

        /**
         * 2. 获取当前proposal
         */
        const psm = new Proposal().getModel()
        const proposalId = curProject.proposal
        const curProposal = await psm.findById(proposalId).exec()

        /**
         * 3. 获取当前的proposal下所有参与的hospital，products以及resources
         */
        const hsm = new Hospital().getModel()
        const hospIds = curProposal.targets
        const condiHospIds = hospIds.map( (x) => {
            return { _id : x }
        } )

        const hospitals = await hsm.find({$or: condiHospIds}).exec()

        const prodsm = new Product().getModel()
        const prodIds = curProposal.products
        const condiProdIds = prodIds.map( (x) => {
            return { _id : x }
        })
        const products = await prodsm.find({$or: condiProdIds}).exec()

        const ressm = new Resource().getModel()
        const resIds = curProposal.resources
        const condiResIds = resIds.map( (x) => {
            return { _id : x }
        })
        const resources = await ressm.find({$or: condiResIds}).exec()

        /**
         * 6. 从数据库中拉取数据Report
         */
        const repsm = new Report().getModel()
        const presm = new Preset().getModel()

        const reports = await repsm.find(
            {
                $or: [
                    {projectId},
                    {proposalId}
                ],
                category: "Hospital",
                phase: { $lt: currentPhase }
            }).sort("phase").exec()

        // const reports = preReports.concat(clacReports)

        const presets = await presm.find(
            {
                $or: [
                    {projectId},
                    {proposalId}
                ],
                category: 8,
                phase: { $lte: currentPhase },
            })

        const reportProposalData = reports.map( (x, index) => {
            const hospital = hospitals.find((h) => h.id === x.hospital.toString())
            const tmprid = x.resource ? x.resource.toString() : ""
            const resource = resources.find((r) => r.id === tmprid)
            const product = products.find((p) => p.id === x.product.toString())

            const condi = (pp: Preset) => {
                if (x.phase < 0) {
                    return pp.phase - 1 === x.phase &&
                        pp.projectId === "" &&
                        pp.hospital.toString() === x.hospital.toString() &&
                        pp.product.toString() === x.product.toString()
                } else {
                    return pp.phase - 1 === x.phase &&
                        pp.projectId === projectId &&
                        pp.hospital.toString() === x.hospital.toString() &&
                        pp.product.toString() === x.product.toString()
                }
            }

            const cpp = presets.find(condi)

            let entrance = ""
            if (cpp) {
                if (cpp.currentDurgEntrance === "1") {
                    entrance = "已开发"
                } else if (cpp.currentDurgEntrance === "2") {
                    entrance = "正在开发"
                } else {
                    entrance = "未开发"
                }
            }

            // if (entrance === "") {
            //     const tmp = presets.find( (pp) => {
            //         return pp.phase === 0 &&
            //             pp.hospital.toString() === x.hospital.toString() &&
            //             pp.product.toString() === x.product.toString()
            //     } )

            //     if (tmp) {
            //         if (tmp.currentDurgEntrance === "1") {
            //             entrance = "已开发"
            //         } else if (tmp.currentDurgEntrance === "2") {
            //             entrance = "正在开发"
            //         } else {
            //             entrance = "未开发"
            //         }
            //     }
            // }

            let pss = ""
            pss = this.formatPhaseToStringDefault(
                this.formatPhaseToDate( curProposal.periodBase, curProposal.periodStep, x.phase )
            )
            switch (x.phase) {
                case -4:
                    pss = "2018Q1"
                    break
                case -3:
                    pss = "2018Q2"
                    break
                case -2:
                    pss = "2018Q3"
                    break
                case -1:
                    pss = "2018Q4"
                    break
                // case 0:
                //     pss = "2019Q1"
                //     break
                // case 1:
                //     pss = "2019Q2"
                //     break
                // case 2:
                //     pss = "2019Q3"
                //     break
                default:
                    // pss = ""
            }

            const qa_func = (qa: number, q: number) => {
                if (qa > 0) {
                    return qa
                } else if ( q === 0) {
                    return "" 
                } else {
                    return ""
                }
            }

            return [
                pss,
                hospital.position,
                hospital.name,
                hospital.level,
                resource ? resource.name : "未分配",
                product.name,
                entrance,
                cpp ? cpp.currentPatientNum : 0,
                qa_func(x.phase < 0 ? x.achievements : cpp.lastAchievement, x.phase < 0 ? x.salesQuota : cpp.lastQuota),
                x.sales
            ]
        } )

        const headers: Array<Array<string | number>> = [
            ["周期", "城市名称", "医院名称", "医院等级", "负责代表", "产品", "进药状态", "患者数量", "指标达成率", "销售额"]
        ]
        const data = headers.concat(reportProposalData)

        const jobId = uuidv4()
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.aoa_to_sheet(data)

        workbook.Props = {
            Author: "Alfred Yang",
            CreatedDate: new Date(),
            Subject: "TM-Export",
            Title: jobId + this.suffix,
        }
        XLSX.utils.book_append_sheet(workbook, worksheet, "TM-Export")
        XLSX.writeFile(workbook, this.localPath + jobId + this.suffix)

        /**
         * 5. 链接oss
         */
        await this.pushResult2OSS(jobId)

        /**
         * 6. 给前端MQTT消息, 用HTTP
         */

        return jobId
    }
}
