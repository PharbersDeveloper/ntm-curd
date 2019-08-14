"use strict"
import { JsonObject, JsonProperty } from "json2typescript"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import { ResultCategory } from "../enum/ResultCategory"
import IModelBase from "./modelBase"

@JsonObject("Evaluation")
class Evaluation extends Typegoose implements IModelBase<Evaluation> {

    @JsonProperty("category", String)
    @prop({ enum: ResultCategory, required: true })
    public category: ResultCategory = ResultCategory.Overall

    @JsonProperty("level", String)
    @prop({ required: true })
    public level: string = ""

    @JsonProperty("abilityDescription", String)
    @prop({ required: false, default: "" })
    public abilityDescription: string = ""

    @JsonProperty("awardDescription", String)
    @prop({ required: false, default: "" })
    public awardDescription: string = ""

    @JsonProperty("levelDescription", String)
    @prop({ required: false, default: "" })
    public levelDescription: string = ""

    @JsonProperty("actionDescription", String)
    @prop({ required: false, default: "" })
    public actionDescription: string = ""

    public getModel() {
        return this.getModelForClass(Evaluation)
    }
}

export default Evaluation
