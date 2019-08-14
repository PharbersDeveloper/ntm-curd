import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript"
import { slow, suite, test, timeout } from "mocha-typescript"
import mongoose = require("mongoose")
import XLSX = require("xlsx")
import PhLogger from "../../src/logger/phLogger"
import Hospital from "../../src/models/Hospital"
import Product from "../../src/models/Product";

@suite class ExcelDataInput {

    public before() {
        PhLogger.info(`before starting the test`)
        mongoose.connect("mongodb://192.168.100.176:27017/pharbers-ntm-client-2")
    }

    @test public async excelModelData() {
        PhLogger.info(`start input data with excel`)
        // const file = "/Users/alfredyang/Desktop/code/pharbers/ntm-curd/test/data/tm.xlsx"
        const file = "test/data/tm.xlsx"

        {
            /**
             * 1. read hospital data in the excel
             * and collect all the insertion ids
             */
            PhLogger.info(`1. read hospital data in the excel`)
            const wb = XLSX.readFile(file)

            const data = XLSX.utils.sheet_to_json(wb.Sheets["Hospital"], { header: 2, defval: "" })

            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Hospital()
            const hosps = await Promise.all(data.map ( x => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                return th.getModel().create(jsonConvert.deserializeObject(x, Hospital))
            }))
            PhLogger.info(hosps)
        }

        /**
         * 2. read products data in the excel
         * and colleect all the insertion ids
         */
        {
            PhLogger.info(`2. read product data in the excel`)
            const wb = XLSX.readFile(file)
    
            const data = XLSX.utils.sheet_to_json(wb.Sheets["Product"], { header: 2, defval: "" })
    
            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Product()
            const products = await Promise.all(data.map ( x => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                return th.getModel().create(jsonConvert.deserializeObject(x, Product))
            }))
            PhLogger.info(products)
        }
    }

    public after() {
        PhLogger.info(`after starting the test`)
        mongoose.disconnect()
    }
}
