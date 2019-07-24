"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import { ResultCategory } from "../enum/ResultCategory"
import IModelBase from "./modelBase"

class Evaluation extends Typegoose implements IModelBase<Evaluation> {
    @prop({ enum: ResultCategory, required: true })
    public category: ResultCategory

    @prop({ required: true })
    public level: string

    @prop({ required: true })
    public levelDescription: string

    @prop({ required: true })
    public actionDescription: string

    public getModel() {
        return this.getModelForClass(Evaluation)
    }
}

export default Evaluation
