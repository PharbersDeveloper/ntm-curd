"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import { ResultCategory } from "../enum/ResultCategory"
import Image from "./Image"
import IModelBase from "./modelBase"
import Proposal from "./Proposal"

class Result extends Typegoose implements IModelBase<Result> {
    @prop({ enum: ResultCategory, required: true })
    public category: ResultCategory

    @prop({ required: true })
    public abilityLevel: string

    @prop({ required: true })
    public awardLevel: string

    @prop({ ref: Image, required: true})
    public img: Ref<Image>

    @prop({ ref: Proposal, required: true})
    public proposal: Ref<Proposal>

    public getModel() {
        return this.getModelForClass(Result)
    }
}

export default Result
