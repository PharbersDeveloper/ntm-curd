// import { slow, suite, test, timeout } from "mocha-typescript"
// import mongoose = require("mongoose")
// import uuid = require("uuid")
// import ExportProejct from "../../src/exportProject/ExportProject"
// import PhLogger from "../../src/logger/phLogger"

// @suite(timeout(1000 * 60), slow(2000))
// class ExportData {

//     public static before() {
//         PhLogger.info(`before starting the test`)
//         mongoose.connect("mongodb://pharbers.com:5555/pharbers-ntm-client")
//     }

//     public static after() {
//         PhLogger.info(`after starting the test`)
//         mongoose.disconnect()
//     }

//     @test public async testExportData() {
//         const p = new ExportProejct(null)
//         PhLogger.info(`start input data with excel`)
//         await p.export2OssWithProject("5d78a12d515b2b002b74a161", "1")
//     }
// }
