"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Image extends Typegoose implements IModelBase<Image> {
    @prop({ required: true })
    public img: string

    @prop({ required: true })
    public tag: string

    @prop({ required: true })
    public flag: number

    public getModel() {
        return this.getModelForClass(Image)
    }
}

export default Image
