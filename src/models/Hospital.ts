"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import Image from "./Image"
import IModelBase from "./modelBase"
import Policy from "./Policy"
import Preset from "./Preset"

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

    @prop({ ref: Image, required: true })
    public avatar: Ref<Image>

    @prop({ required: true })
    public category: string

    @prop({ required: true })
    public level: string

    @prop({ required: true })
    public docterNumber: number

    @prop({ required: true })
    public bedNumber: number

    @prop({ required: true })
    public income: number

    @prop({ required: true })
    public spaceBelongs: string

    @prop({ required: true })
    public abilityToPay: string

    @arrayProp({ itemsRef: Policy, required: true })
    public policies: Array<Ref<Policy>>

    @arrayProp({ itemsRef: Preset,  required: true, default: null})
    public presets: Array<Ref<Preset>>

    public getModel() {
        return this.getModelForClass(Hospital)
    }
}

export default Hospital
