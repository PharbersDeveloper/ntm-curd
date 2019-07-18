"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Policy extends Typegoose implements IModelBase<Policy> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public describe: string

    public getModel() {
        return this.getModelForClass(Policy)
    }
}

export default Policy
