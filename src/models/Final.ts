"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import { AnswerCategory } from "../enum/AnswerCategory"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Product from "./Product"
import Resource from "./Resource"

class Final extends Typegoose implements IModelBase<Final> {
    @prop({ required: true })
    public sales: number

    @prop({ required: true })
    public quota: number

    @prop({ required: true })
    public budget: number

    @prop({ required: true })
    public quotaAchv: number

    @prop({ required: true })
    public salesForceProductivity: number

    @prop({ required: true })
    public roi: number

    public getModel() {
        return this.getModelForClass(Final)
    }
}

export default Final
