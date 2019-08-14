import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript"
import { slow, suite, test, timeout } from "mocha-typescript"
import mongoose = require("mongoose")
import XLSX = require("xlsx")
import PhLogger from "../../src/logger/phLogger"
import Evaluation from "../../src/models/Evaluation"
import Hospital from "../../src/models/Hospital"
import Preset from "../../src/models/Preset"
import Product from "../../src/models/Product"
import Proposal from "../../src/models/Proposal"
import Requirement from "../../src/models/Requirement"
import Resource from "../../src/models/Resource"
import UsableProposal from "../../src/models/UsableProposal"
import Validation from "../../src/models/Validation"

@suite class ExcelDataInput {

    public before() {
        PhLogger.info(`before starting the test`)
        mongoose.connect("mongodb://192.168.100.176:27017/pharbers-ntm-client-2")
    }

    @test public async excelModelData() {
        PhLogger.info(`start input data with excel`)
        const file = "test/data/tm.xlsx"
        const wb = XLSX.readFile(file)

        /**
         * 1. read hospital data in the excel
         * and collect all the insertion ids
         */
        let hosps: Hospital[] = []
        {
            PhLogger.info(`1. read hospital data in the excel`)

            const data = XLSX.utils.sheet_to_json(wb.Sheets.Hospital, { header: 2, defval: "" })

            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Hospital()
            hosps = await Promise.all(data.map ( (x) => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                return th.getModel().create(jsonConvert.deserializeObject(x, Hospital))

            }))
        }

        /**
         * 2. read products data in the excel
         * and colleect all the insertion ids
         */
        let products: Product[] = []
        {
            PhLogger.info(`2. read product data in the excel`)

            const data = XLSX.utils.sheet_to_json(wb.Sheets.Product, { header: 2, defval: "" })

            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Product()
            products = await Promise.all(data.map ( (x) => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                return th.getModel().create(jsonConvert.deserializeObject(x, Product))
            }))
        }

        /**
         * 3. read resources data in the excel
         * and colleect all the insertion ids
         */
        let resources: Resource[] = []
        {
            PhLogger.info(`3. read resource data in the excel`)

            const data = XLSX.utils.sheet_to_json(wb.Sheets.Resource, { header: 2, defval: "" })

            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Resource()
            resources = await Promise.all(data.map ( (x) => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                return th.getModel().create(jsonConvert.deserializeObject(x, Resource))
            }))
        }

        /**
         * 4. read evaluation data in the excel
         * and colleect all the insertion ids
         */
        let evls: Evaluation[] = []
        {
            PhLogger.info(`4. read evaluation data in the excel`)

            const data = XLSX.utils.sheet_to_json(wb.Sheets.Evaluation, { header: 2, defval: "" })

            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Evaluation()
            evls = await Promise.all(data.map ( (x) => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                return th.getModel().create(jsonConvert.deserializeObject(x, Evaluation))
            }))
        }

        /**
         * 5. read requirement data in the excel
         * and colleect all the insertion ids
         */
        let reqs: Requirement[] = []
        {
            PhLogger.info(`5. read requirement data in the excel`)

            const data = XLSX.utils.sheet_to_json(wb.Sheets.Requirement, { header: 2, defval: "" })

            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Requirement()
            reqs = await Promise.all(data.map ( (x) => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                return th.getModel().create(jsonConvert.deserializeObject(x, Requirement))
            }))
        }

        /**
         * 9. read preset data in the excel
         * and colleect all the insertion ids
         */
        let presets: Preset[] = []
        {
            PhLogger.info(`9. read preset data in the excel`)

            const data = XLSX.utils.sheet_to_json(wb.Sheets.Preset, { header: 2, defval: "" })

            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Preset()
            presets = await Promise.all(data.map ( (x) => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                return th.getModel().create(jsonConvert.deserializeObject(x, Preset))
            }))
        }

        /**
         * 10. read proposal data in the excel
         * and colleect all the insertion ids
         */
        {
            PhLogger.info(`10. read proposal data in the excel`)

            const data = XLSX.utils.sheet_to_json(wb.Sheets.Proposal, { header: 2, defval: "" })

            const jsonConvert: JsonConvert = new JsonConvert()
            const th = new Proposal()
            const pls = await Promise.all(data.map ( async (x) => {
                // jsonConvert.operationMode = OperationMode.LOGGING // print some debug data
                jsonConvert.ignorePrimitiveChecks = true // don't allow assigning number to string etc.
                jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL // never allow null
                const proposal = jsonConvert.deserializeObject(x, Proposal)
                proposal.targets = hosps
                proposal.products = products
                proposal.presets = presets
                proposal.resources = resources
                proposal.evaluations = evls
                proposal.quota = reqs[0]

                const validation = new Validation()
                validation.inputType = "managementTimeInputType#Number*businessBudgetInputType#Number*businessSalesTargetInputType#Number*businessMeetingPlacesInputType#Number"
                validation.maxValue = "managementMaxTime#100*managementMaxActionPoint#5*businessMaxBudget#200000*businessMaxSalesTarget#3700000*businessMaxMeetingPlaces#6"
                const v = await validation.getModel().create(validation)
                proposal.validation = v

                const f = await th.getModel().create(proposal)
                const ups = new UsableProposal()
                ups.accountId = "5ce6d793aa60bdae2e8656e7"
                ups.proposal = f
                ups.getModel().create(ups)
            }))

        }
    }

    public after() {
        PhLogger.info(`after starting the test`)
        mongoose.disconnect()
    }
}
