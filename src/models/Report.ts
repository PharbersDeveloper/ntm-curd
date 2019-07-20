"use strict"

import { prop, Ref, Typegoose } from "typegoose"
import { ReportCategory } from "../enum/ReportCategory"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Product from "./Product"
import Resource from "./Resource"

class Report extends Typegoose implements IModelBase<Report> {
    @prop({ enum: ReportCategory, required: true })
    public category: ReportCategory

    @prop({})
    public potential?: number

    @prop({})
    public sales?: number

    @prop({})
    public salesQuota?: number

    @prop({})
    public share?: number

    @prop({ref: Hospital, default: null})
    public hospital?: Ref<Hospital>

    @prop({ref: Product, default: null})
    public product?: Ref<Product>

    @prop({ref: Resource, default: null})
    public resource?: Ref<Resource>

    @prop({})
    public growth?: number

    @prop({})
    public achievements?: number

    public getModel() {
        return this.getModelForClass(Report)
    }
}

export default Report
