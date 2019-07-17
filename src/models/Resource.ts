"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Resource extends Typegoose implements IModelBase<Resource> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public gender: number

    @prop({ required: true })
    public avatar: string

    public getModel() {
        return this.getModelForClass(Resource)
    }
}

export default Resource
