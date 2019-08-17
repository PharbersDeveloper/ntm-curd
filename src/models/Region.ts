"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"
import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject("Evaluation")
class Region extends Typegoose implements IModelBase<Region> {
    @JsonProperty("name", String)
    @prop({ required: true, default: "" })
    public name: string = ""

    @JsonProperty("level", String)
    @prop({ required: true, default: "" })
    public level: string = "" 

    @JsonProperty("strategyPosition", String)
    @prop({ required: true })
    public strategyPosition: string = ""

    @JsonProperty("localPatient", Number)
    @prop({ required: true, default: 0.0 })
    public localPatient: number = 0.0

    @JsonProperty("outsidePatient", Number)
    @prop({ required: true, default: 0.0 })
    public outsidePatient: number = 0.0

    @JsonProperty("patientNum", Number)
    @prop({ required: true, default: 0.0 })
    public patientNum: number = 0.0

    public getModel() {
        return this.getModelForClass(Region)
    }
}

export default Region
