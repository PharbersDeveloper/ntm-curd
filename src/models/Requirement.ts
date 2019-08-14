"use strict"
import { JsonObject, JsonProperty } from "json2typescript"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

@JsonObject("Requirement")
class Requirement extends Typegoose implements IModelBase<Requirement> {

    @JsonProperty("totalQuotas", Number)
    @prop({ required: true })
    public totalQuotas: number = 0

    @JsonProperty("meetingPlaces", Number)
    @prop({ required: true })
    public meetingPlaces: number = 0

    @JsonProperty("visitingHours", Number)
    @prop({ required: true })
    public visitingHours: number = 0

    @JsonProperty("teamExperience", String)
    @prop({ required: false, default: "" })
    public teamExperience: string = ""

    @JsonProperty("teamDescription", String)
    @prop({ required: false, default: "" })
    public teamDescription: string

    @JsonProperty("managerKpi", Number)
    @prop({ required: true })
    public managerKpi: number = 0

    @JsonProperty("managementHours", Number)
    @prop({ required: true })
    public mangementHours: number = 0

    @JsonProperty("totalBudget", Number)
    @prop({ required: true })
    public totalBudget: number = 0

    public getModel() {
        return this.getModelForClass(Requirement)
    }
}

export default Requirement
