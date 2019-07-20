"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class SplitRequirement extends Typegoose implements IModelBase<SplitRequirement> {

    @prop({ default: 0})
    public salesQuota: number

    @prop({ default: 0})
    public potential: number

    @prop({ default: 0})
    public achievements: number

    public getModel() {
        return this.getModelForClass(SplitRequirement)
    }
}

export default SplitRequirement
