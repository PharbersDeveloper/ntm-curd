import { slow, suite, test, timeout } from "mocha-typescript"
import PhLogger from "../../src/logger/phLogger"
import mongoose = require("mongoose")
import XLSX = require("xlsx")

@suite class ExcelDataInput {
    
    public before() {
        PhLogger.info(`before starting the test`)
        mongoose.connect("mongodb://192.168.100.176:27017/pharbers-ntm-client-2")
    }

    @test public excelModelData() {
        PhLogger.info(`start input data with excel`)
        const file = "../../../test/data/tm.xlsx"
        /**
         * 1. read hospital data in the excel
         * and collect all the insertion ids
         */
        PhLogger.info(`1. read hospital data in the excel`)
        var wb = XLSX.readFile(file);
	    /* generate array of arrays */
	    const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]], {header:1});
	    console.log(data);
    }

    public after() {
        PhLogger.info(`before starting the test`)
        mongoose.disconnect()
    }
}
