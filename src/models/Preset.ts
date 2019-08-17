"use strict"
import { JsonObject, JsonProperty } from "json2typescript"
import { prop, Ref, Typegoose } from "typegoose"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Product from "./Product"
import Proposal from "./Proposal"
import Resource from "./Resource"

@JsonObject("Preset")
class Preset extends Typegoose implements IModelBase<Preset> {

    @prop({ref: Proposal, required: true, default: null})
    public proposal?: Ref<Proposal>

    @prop({ required: false, default: "" })
    public proposalId?: string

    @prop({ required: false, default: "" })
    public projectId?: string

    @prop({ required: false, default: "" })
    public periodId?: string

    @prop({ref: Product, required: true, default: null })
    public product?: Ref<Product>

    @prop({ref: Hospital, required: true, default: null })
    public hospital?: Ref<Hospital>

    @prop({ref: Resource, required: false, default: null })
    public resource?: Ref<Resource>

    @JsonProperty("phase", Number)
    @prop({ required: true, default: 0 })
    public phase: number = 0  //

    @JsonProperty("category", Number)
    @prop({ default: 0 })
    public category?: number = 0  //

    @JsonProperty("lastQuota", Number)
    @prop({ default: 0 })
    public lastQuota?: number = 0  // p_quota

    @JsonProperty("lastSales", Number)
    @prop({ default: 0 })
    public lastSales?: number = 0    // p_sales

    @JsonProperty("lastAchievement", Number)
    @prop({ default: 0.0 })
    public lastAchievement?: number = 0     // p_sales

    @JsonProperty("potential", Number)
    @prop({ default: 0 })
    public potential?: number = 0   // 铁马不变

    @JsonProperty("lastShare", Number)
    @prop({ default: 0 })
    public lastShare?: number = 0   // p_share

    @JsonProperty("currentTMA", Number)
    @prop({ required: false, default: 0 })
    public currentTMA?: number = 0 // p_territory_management_ability

    @JsonProperty("currentSalesSkills", Number)
    @prop({ default: 0 })
    public currentSalesSkills?: number = 0 // p_sales_skills

    @JsonProperty("currentProductKnowledge", Number)
    @prop({ default: 0 })
    public currentProductKnowledge?: number = 0 // p_product_knowledge

    @JsonProperty("currentBehaviorEfficiency", Number)
    @prop({ default: 0 })
    public currentBehaviorEfficiency?: number = 0// p_behavior_efficiency

    @JsonProperty("currentWorkMotivation", Number)
    @prop({ default: 0 })
    public currentWorkMotivation?: number = 0 // p_work_motivation

    @JsonProperty("currentTargetDoctorNum", Number)
    @prop({ default: 0 })
    public currentTargetDoctorNum?: number = 0 // p_target

    @JsonProperty("currentTargetDoctorCoverage", Number)
    @prop({ default: 0.0 })
    public currentTargetDoctorCoverage?: number = 0.0 // p_target_coverage

    @JsonProperty("currentClsADoctorVT", Number)
    @prop({ required: false, default: 0 })
    public currentClsADoctorVT?: number = 0 // p_high_target

    @JsonProperty("currentClsBDoctorVT", Number)
    @prop({ required: false, default: 0 })
    public currentClsBDoctorVT?: number = 0 // p_middle_target

    @JsonProperty("currentClsADoctorVT", Number)
    @prop({ required: false, default: 0 })
    public currentClsCDoctorVT?: number = 0 // p_low_target

    @JsonProperty("currentPatientNum", Number)
    @prop({ required: false, default: 0 })
    public currentPatientNum?: number = 0

    @JsonProperty("currentDurgEntrance", String)
    @prop({ required: false, default: "" })
    public currentDurgEntrance?: string = ""

    @JsonProperty("currentPolicy", String, false)
    @prop({ required: false, default: "" })
    public currentPolicy?: string = ""

    @JsonProperty("lastBudget", Number)
    @prop({ required: false, default: 0 })
    public lastBudget?: number = 0

    @JsonProperty("initBudget", Number)
    @prop({ required: false, default: 0 })
    public initBudget?: number = 0

    public getModel() {
        return this.getModelForClass(Preset)
    }
}

export default Preset
