"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import Image from "./Image"
import IModelBase from "./modelBase"

class Product extends Typegoose implements IModelBase<Product> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public productCategory: string

    @prop({ required: true })
    public medicateCategory: string

    @prop({ required: true })
    public producer: string

    @prop({ ref: Image, required: true })
    public avatar: Ref<Image>

    @prop({ required: true })
    public safety: string

    @prop({ required: true })
    public effectiveness: string

    @prop({ required: true })
    public convenience: string

    @prop({ required: true })
    public productType: string

    @prop({ required: true })
    public priceType: string

    @prop({ required: true })
    public price: number

    @prop({ required: true })
    public cost: number

    @prop({ required: true })
    public launchDate: number

    @prop({ required: true })
    public treatmentArea: string

    @prop({ required: true })
    public feature: string

    @prop({ required: true })
    public targetDepartment: string

    @prop({ required: true })
    public patentDescribe: string

    @prop({ required: true })
    public costEffective: string

    @prop({ required: true })
    public lifeCycle: string

    public getModel() {
        return this.getModelForClass(Product)
    }
}

export default Product
