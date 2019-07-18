"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import Image from "./Image"
import IModelBase from "./modelBase"

class Resource extends Typegoose implements IModelBase<Resource> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public gender: number

    @prop({ required: true })
    public age: number

    @prop({ required: true })
    public education: string

    @prop({ required: true })
    public professional: string

    @prop({ required: true })
    public advantage: string

    @prop({ required: true })
    public evaluation: string

    @prop({ required: true })
    public experience: number

    @prop({ required: true })
    public totalTime: number

    @prop({ required: true })
    public entryTime: number

    @prop({ ref: Image, required: true })
    public avatar: Ref<Image>

    public getModel() {
        return this.getModelForClass(Resource)
    }
}

export default Resource
