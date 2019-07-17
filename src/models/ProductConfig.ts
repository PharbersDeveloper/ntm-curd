"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"
import Product from "./Product"

class ProductConfig extends Typegoose implements IModelBase<ProductConfig> {

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

    @prop({ref: Product, required: true })
    public product: Ref<Product>

    public getModel() {
        return this.getModelForClass(ProductConfig)
    }
}

export default ProductConfig
