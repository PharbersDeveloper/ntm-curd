"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Validation extends Typegoose implements IModelBase<Validation> {
    @prop({ required: true })
    public inputType: string

    @prop({ required: true })
    public maxValue: string

    @prop({ required: false, default: "" })
    public mustInput: string

    @prop({ required: false, default: "" })
    public mustFullyAllocate: string

    @prop({ required: false, default: "" })
    public noZero: string

    @prop({ required: false, default: "" })
    public special: string

    public getModel() {
        return this.getModelForClass(Validation)
    }
}

export default Validation
