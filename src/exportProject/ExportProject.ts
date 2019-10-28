"use strict"
import OSS from "ali-oss"
import R from "ramda"
import uuidv4 from "uuid/v4"
import XLSX = require("xlsx")
import { OssConf } from "../configFactory/ossConf"
import PhLogger from "../logger/phLogger"
import phLogger from "../logger/phLogger"
import Answer from "../models/Answer"
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

    public async export2OssWithProject(projectId: string, phase: string, isReport: boolean): Promise<any> {
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
        let unSortData: any[] = []
        let headers: Array<Array<string | number>> = []

        const proposalCase = curProposal.case
        if (isReport) {
            if (proposalCase === "ucb") {
                headers = [
                    ["周期", "城市名称", "医院名称", "医院等级", "负责代表", "产品", "进药状态", "患者数量", "指标达成率", "销售额"]
                ]
            } else if (proposalCase === "tm") {
                headers = [
                    ["周期", "城市名称", "医院名称", "医院等级", "负责代表", "产品", "潜力", "指标达成率", "销售额"]
                ]
            }
            /**
             * 6. 从数据库中拉取数据Report
             */
            const repsm = new Report().getModel()
            const presm = new Preset().getModel()

            const reports = await repsm.find(
                {
                    $or: [
                        { projectId },
                        { proposalId: proposalId.toString() }
                    ],
                    category: "Hospital",
                    phase: { $lt: currentPhase }
                }).sort("phase").exec()

            // const reports = preReports.concat(clacReports)

            const presets = await presm.find(
                {
                    $or: [
                        { projectId },
                        { proposalId: proposalId.toString() }
                    ],
                    category: 8,
                    phase: { $lte: currentPhase },
                })

            unSortData = reports.map( (x, index) => {
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

                const qFunc = (qa: number, q: number) => {
                    if (qa > 0) {
                        return qa.toFixed(3)
                    } else if ( q === 0) {
                        return 0
                    } else {
                        return 0
                    }
                }

                const achiTMFunc = (sales: number, salesQuota: number) => {
                    if (salesQuota === 0) {
                        return 0
                    } else {
                        return (sales / salesQuota).toFixed(3)
                    }
                }

                let potentialOrPatient = 0
                let achi = null
                if (proposalCase === "ucb") {
                    const a = x.phase < 0 ? x.achievements : cpp.lastAchievement
                    const b = x.phase < 0 ? x.salesQuota : cpp.lastQuota

                    potentialOrPatient = cpp ? cpp.currentPatientNum : 0
                    achi = qFunc(a, b)
                } else if (proposalCase === "tm") {
                    potentialOrPatient = cpp ? cpp.potential : 0
                    achi = achiTMFunc(x.sales, x.salesQuota)
                }

                if (proposalCase === "ucb") {
                    return [
                        pss, // 0
                        hospital.position,
                        hospital.name, // 2
                        hospital.level,
                        resource ? resource.name : "未分配",
                        product.name,
                        entrance,
                        potentialOrPatient, // 7
                        // tm 潜力, ucb 病患数量
                        // tslint:disable-next-line: max-line-length
                        achi,
                        x.sales ? x.sales.toFixed(0) : 0 // 9
                    ]
                } else if (proposalCase === "tm") {
                    return [
                        pss, // 0
                        hospital.position,
                        hospital.name, // 2
                        hospital.level,
                        resource ? resource.name : "未分配",
                        product.name,
                        potentialOrPatient, // 7
                        // tm 潜力, ucb 病患数量
                        // tslint:disable-next-line: max-line-length
                        achi,
                        x.sales ? x.sales.toFixed(0) : 0 // 9
                    ]
                }
            } )
        } else {
            headers = [
                ["周期", "代表", "医院", "产品名称", "销售指标分配", "预算分配"]
            ]
            /**
             * inputReport
             */
            const anssm = new Answer().getModel()
            const perIds = curProject.periods.map( (x) => {
                return { _id : x }
            } )
            const allPeriods = await perm.find({$or: perIds}).exec()
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < allPeriods.length ; i++) {
                const phaseAnsIds = allPeriods[i].answers.map( (x) => {
                    return { _id : x }
                } )
                phLogger.info(phaseAnsIds)
                const phaseAnswers = await anssm.find({$or: phaseAnsIds, category: "Business"}).exec()
                const handledPhaseAnswers = phaseAnswers.map((ele, idx) => {
                    const hospital = hospitals.find((h) => h.id === ele.target.toString())
                    const resource = resources.find((r) => r.id === ele.resource.toString())
                    const product = products.find((p) => p.id === ele.product.toString())
                    return [
                        allPeriods[i].name,
                        resource ? resource.name : "未分配",
                        hospital.name,
                        product.name,
                        ele.salesTarget,
                        ele.budget
                    ]
                })
                unSortData = unSortData.concat(handledPhaseAnswers)
            }
        }
        /**
         * 1. group by pss
         */
        const toPhase = ((x: Array<string | number>) => {
            return x[0] as string
        } )
        const grouped = R.groupBy(toPhase, unSortData)

        let fr: Array<Array<string | number>> = []
        for (const key of Object.keys(grouped)) {
            const rd = grouped[key]

            /**
             * 2. to every phase, reduceBy hospital
             */
            const toHos = ((x: Array<string | number>) => {
                return x[2] as string
            } )

            const hos = R.groupBy(toHos, rd)
            /**
             * 2.1 sort in the hos
             */
            const sortFunc =
                (left: Array<string | number>, right: Array<string | number>) => {
                    const m = (right[7] as number) - (left[7] as number)
                    return m === 0 ? (right[9] as number) - (left[9] as number) : m
                }

            const nhos = Object.keys(hos).map((x) => {
                const ht = hos[x].sort(sortFunc)
                return { key: x, lst: ht }
            } )

            const patNum = (acc: number, item: Array<string | number>) => acc += item[7] as number
            const reduce = R.reduceBy(patNum, 0, toHos, rd)

            /**
             * 3. sort hospital in the phase
             */
            const sortArr = Object.keys(reduce).map((x: string) => {
                return { key: x, value: reduce[x] }
            })
            const sortedWithPat = R.sort((left, right) => right.value - left.value, sortArr)

            let result: Array<Array<string | number>> = []
            sortedWithPat.forEach( (item) => {
                result = result.concat(nhos.find((x) => x.key === item.key).lst)
            } )
            fr = fr.concat(result)
        }

        const data = headers.concat(fr)

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

        return jobId
    }
}
