"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Hospital extends Typegoose implements IModelBase<Hospital> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public describe: string

    @prop({ required: true })
    public regtime: string

    @prop({ required: true })
    public position: string

    @prop({ })
    public code?: string

    @prop({ required: true })
    public avatar: string

    @prop({ required: true })
    public category: string

    @prop({ required: true })
    public level: string

    public getModel() {
        return this.getModelForClass(Hospital)
    }
}

export default Hospital
