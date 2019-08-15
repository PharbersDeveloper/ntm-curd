"use strict"
import { JsonObject, JsonProperty } from "json2typescript"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import Image from "./Image"
import IModelBase from "./modelBase"
import Policy from "./Policy"
import Region from "./Region"

@JsonObject("Hospital")
class Hospital extends Typegoose implements IModelBase<Hospital> {

    @JsonProperty("name", String)
    @prop({ required: true })
    public name: string = ""

    @JsonProperty("describe", String)
    @prop({ required: true })
    public describe: string = ""

    @JsonProperty("regtime", String)
    @prop({ required: true })
    public regtime: string = ""

    @JsonProperty("position", String)
    @prop({ required: true })
    public position: string = ""

    @JsonProperty("code", String)
    @prop({ })
    public code?: string = ""

    @prop({ ref: Image, required: true })
    public avatar: Ref<Image>

    @JsonProperty("category", String)
    @prop({ required: true })
    public category: string = ""

    @JsonProperty("level", String)
    @prop({ required: true })
    public level: string = ""

    @JsonProperty("doctorNumber", Number)
    @prop({ required: true })
    public docterNumber: number = 0

    @JsonProperty("bedNumber", Number)
    @prop({ required: true })
    public bedNumber: number = 0

    @JsonProperty("income", Number)
    @prop({ required: true })
    public income: number = 0

    @JsonProperty("spaceBelongs", String)
    @prop({ required: false, default: "" })
    public spaceBelongs: string = ""

    @JsonProperty("abilityToPay", String)
    @prop({ required: false, default: "" })
    public abilityToPay: string = ""

    @JsonProperty("selfPayPercentage", Number)
    @prop({ required: true })
    public selfPayPercentage: number = 0.0

    @JsonProperty("patientNum", Number)
    @prop({ required: false, default: 0 })
    public patientNum: number = 0.0

    @JsonProperty("patientNumA", Number)
    @prop({ required: false, default: 0 })
    public patientNumA: number = 0.0

    @JsonProperty("patientNumB", Number)
    @prop({ required: false, default: 0 })
    public patientNumB: number = 0.0

    @arrayProp({ itemsRef: Policy, required: true })
    public policies: Array<Ref<Policy>>

    @prop({ ref: Region, required: true })
    public region: Ref<Region>

    public getModel() {
        return this.getModelForClass(Hospital)
    }
}

export default Hospital
