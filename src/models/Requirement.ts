"use strict"
import { JsonObject, JsonProperty } from "json2typescript"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

@JsonObject("Requirement")
class Requirement extends Typegoose implements IModelBase<Requirement> {

    @JsonProperty("totalQuotas", Number)
    @prop({ required: false, default: 0 })
    public totalQuotas: number = 0

    @JsonProperty("meetingPlaces", Number)
    @prop({ required: false, default: 0 })
    public meetingPlaces: number = 0

    @JsonProperty("visitingHours", Number)
    @prop({ required: false, default: 0 })
    public visitingHours: number = 0

    @JsonProperty("teamExperience", String)
    @prop({ required: false, default: "" })
    public teamExperience: string = ""

    @JsonProperty("teamDescription", String)
    @prop({ required: false, default: "" })
    public teamDescription: string

    @JsonProperty("managerKpi", Number)
    @prop({ required: false, default: 0})
    public managerKpi: number = 0

    @JsonProperty("managementHours", Number)
    @prop({ required: false, default: 0 })
    public mangementHours: number = 0

    @JsonProperty("totalBudget", Number)
    @prop({ required: false, default: 0 })
    public totalBudget: number = 0

    public getModel() {
        return this.getModelForClass(Requirement)
    }
}

export default Requirement
