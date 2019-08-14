import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript"
import { slow, suite, test, timeout } from "mocha-typescript"
import mongoose = require("mongoose")
import XLSX = require("xlsx")
import PhLogger from "../../src/logger/phLogger"
import Hospital from "../../src/models/Hospital"

@suite class ExcelDataInput {

    public before() {
        PhLogger.info(`before starting the test`)
        mongoose.connect("mongodb://192.168.100.176:27017/pharbers-ntm-client-2")
    }

    @test public excelModelData() {
        PhLogger.info(`start input data with excel`)
        // const file = "/Users/alfredyang/Desktop/code/pharbers/ntm-curd/test/data/tm.xlsx"
        const file = "test/data/tm.xlsx"
        /**
         * 1. read hospital data in the excel
         * and collect all the insertion ids
         */
        PhLogger.info(`1. read hospital data in the excel`)
        const wb = XLSX.readFile(file)

        const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]], { header: 2, defval: "" })

        const jsonConvert: JsonConvert = new JsonConvert()
        const tmp = new Hospital()
        data.map ( async (x) => {
            jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
            jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
            jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
            const result = jsonConvert.deserializeObject(x, Hospital)
            const f = await tmp.getModel().create(result)
            PhLogger.info(f)
        })
        PhLogger.info(data)
    }

    public after() {
        PhLogger.info(`after starting the test`)
        // mongoose.disconnect()
    }
}
