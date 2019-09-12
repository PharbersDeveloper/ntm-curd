"use strict"

// import Proposal from "./Proposal"
import { JsonObject, JsonProperty } from "json2typescript"
import { prop, Ref, Typegoose } from "typegoose"
import { ReportCategory } from "../enum/ReportCategory"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Product from "./Product"
import Resource from "./Resource"

@JsonObject("Report")
class Report extends Typegoose implements IModelBase<Report> {
    @JsonProperty("category", String)
    @prop({ enum: ReportCategory, required: true })
    public category: ReportCategory = ReportCategory.Hospital

    @prop({ default: "" })
    public proposalId?: string = ""

    @prop({ default: "" })
    public projectId?: string = ""

    @prop({ default: "" })
    public periodId?: string = ""

    @prop({ref: Hospital, default: null})
    public hospital?: Ref<Hospital>

    @prop({ref: Product, default: null})
    public product?: Ref<Product>

    @prop({ref: Resource, default: null})
    public resource?: Ref<Resource>

    @JsonProperty("phase", Number)
    @prop({ required: true, default: 0 })
    public phase?: number = 0

    @JsonProperty("region", String)
    @prop({ required: false, default: "" })
    public region?: string = ""

    // 写到下期
    // @JsonProperty("potential", Number)
    // @prop({ required: false, default: 0 })
    // public potential?: number = 0

    // 写到下期，但是导出有用，以后优化，多次数据
    @JsonProperty("patientNum", Number)
    @prop({ required: false, default: 0 })
    public patientNum?: number = 0

    // 写到下期，但是导出有用，以后优化，多次数据
    @JsonProperty("drugEntrance", String)
    @prop({ required: false, default: "" })
    public drugEntrance?: string = ""

    // 写到下期
    // @JsonProperty("budget", Number)
    // @prop({ required: false, default: 0 })
    // public budget?: number = 0

    @JsonProperty("sales", Number)
    @prop({ required: false, default: 0 })
    public sales?: number = 0

    @JsonProperty("salesContri", Number)
    @prop({ required: false, default: 0 })
    public salesContri?: number = 0

    @JsonProperty("quota", Number)
    @prop({ required: false, default: 0 })
    public salesQuota?: number = 0

    @JsonProperty("quotaGrowthMOM", Number)
    @prop({ required: false, default: 0 })
    public quotaGrowthMOM?: number = 0

    @JsonProperty("quotaContri", Number)
    @prop({ required: false, default: 0 })
    public quotaContri?: number = 0

    @JsonProperty("share", Number)
    @prop({ required: false, default: 0 })
    public share?: number = 0

    @JsonProperty("salesGrowthYOY", Number)
    @prop({ required: false, default: 0 })
    public salesGrowthYOY?: number = 0

    @JsonProperty("salesGrowthMOM", Number)
    @prop({ required: false, default: 0 })
    public salesGrowthMOM?: number = 0

    @JsonProperty("quotaAchievement", Number)
    @prop({ required: false, default: 0 })
    public achievements?: number = 0

    @JsonProperty("ytd", Number)
    @prop({ required: false, default: 0 })
    public ytd?: number = 0

    public getModel() {
        return this.getModelForClass(Report)
    }
}

export default Report
