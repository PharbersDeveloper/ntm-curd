import { slow, suite, test, timeout } from "mocha-typescript"
import PhLogger from "../../src/logger/phLogger"

@suite class ExcelDataInput {
    @test public excelModelData() {
        PhLogger.info(`start input data with excel`)
    }
}
