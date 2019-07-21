"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Product from "./Product"

class Preset extends Typegoose implements IModelBase<Preset> {

    @prop({ref: Product, required: true})
    public product: Ref<Product>

    @prop({ref: Hospital, required: true})
    public hospital: Ref<Hospital>

    @prop({ default: 0})
    public salesQuota: number

    @prop({ default: 0})
    public potential: number

    @prop({ default: 0})
    public achievements: number

    public getModel() {
        return this.getModelForClass(Preset)
    }
}

export default Preset
