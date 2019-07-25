"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Validation extends Typegoose implements IModelBase<Validation> {
    @prop({ required: true })
    public type: string

    public getModel() {
        return this.getModelForClass(Validation)
    }
}

export default Validation
