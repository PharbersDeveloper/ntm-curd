"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import Image from "./Image"
import IModelBase from "./modelBase"

class Resource extends Typegoose implements IModelBase<Resource> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public gender: number

    @prop({ ref: Image, required: true })
    public avatar: Ref<Image>

    public getModel() {
        return this.getModelForClass(Resource)
    }
}

export default Resource
