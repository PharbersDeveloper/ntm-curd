"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import { ResultCategory } from "../enum/ResultCategory"
import Level from "./Level"
import IModelBase from "./modelBase"

class Result extends Typegoose implements IModelBase<Result> {
    @prop({ enum: ResultCategory, required: true })
    public category: ResultCategory

    @prop({ ref: Level, required: true})
    public abilityLevel: Ref<Level>

    @prop({ ref: Level, required: true})
    public awardLevel: Ref<Level>

    public getModel() {
        return this.getModelForClass(Result)
    }
}

export default Result
