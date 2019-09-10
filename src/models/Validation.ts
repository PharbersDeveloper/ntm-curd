"use strict"
import { JsonObject, JsonProperty } from "json2typescript"
import { prop, Ref, Typegoose } from "typegoose"
import { ValidationType } from "../enum/ValidationType"
import IModelBase from "./modelBase"

@JsonObject("Validation")
class Validation extends Typegoose implements IModelBase<Validation> {

    @JsonProperty("validationType", String)
    @prop({ required: true, default: ValidationType.String })
    public validationType: ValidationType.String = ValidationType.String

    @JsonProperty("expression", String)
    @prop({ required: true, default: "" })
    public expression: string = undefined

    @JsonProperty("condition", String)
    @prop({ required: true, default: "" })
    public condition: string = undefined

    @JsonProperty("error", String)
    @prop({ required: true, default: "" })
    public error: string = undefined

    @JsonProperty("leftValue", String)
    @prop({ required: true, default: "" })
    public leftValue: string = undefined

    @JsonProperty("rightValue", String)
    @prop({ required: true, default: "" })
    public rightValue: string = undefined

    public getModel() {
        return this.getModelForClass(Validation)
    }
}

export default Validation
