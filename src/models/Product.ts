"use strict"
import { prop, Ref, Typegoose } from "typegoose"
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

    @prop({ required: true })
    public avatar: string

    public getModel() {
        return this.getModelForClass(Product)
    }
}

export default Product
