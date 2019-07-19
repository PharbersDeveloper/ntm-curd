"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Requirement extends Typegoose implements IModelBase<Requirement> {
    @prop({ required: true })
    public totalQuotas: number

    @prop({ required: true })
    public meetingPlaces: number

    @prop({ required: true })
    public visitingHours: number

    @prop({ required: true })
    public teamExperience: string

    @prop({ required: true })
    public teamDescription: string

    @prop({ required: true })
    public managerKpi: number

    @prop({ required: true })
    public mangementHours: number

    @prop({ required: true })
    public totalBudget: number

    public getModel() {
        return this.getModelForClass(Requirement)
    }
}

export default Requirement
