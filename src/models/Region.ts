"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Region extends Typegoose implements IModelBase<Region> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public type: number

    @prop({ required: true })
    public strategyPosition: number

    @prop({ required: true })
    public localPatient: number

    @prop({ required: true })
    public outsidePatient: number

    @prop({ required: true })
    public patientNum: number

    public getModel() {
        return this.getModelForClass(Region)
    }
}

export default Region
