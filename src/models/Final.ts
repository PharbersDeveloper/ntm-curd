"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Final extends Typegoose implements IModelBase<Final> {
    @prop({ required: true })
    public sales: number

    @prop({ required: true })
    public quota: number

    @prop({ required: true })
    public budget: number

    @prop({ required: true })
    public quotaAchv: number

    @prop({ required: true })
    public salesForceProductivity: number

    @prop({ required: true })
    public roi: number

    @prop({ required: true })
    public newAccount: number

    @prop({ required: false})
    public generalPerformance: number

    @prop({ required: false})
    public resourceAssigns: number

    @prop({ required: false})
    public regionDivision: number

    @prop({ required: false})
    public targetAssigns: number

    @prop({ required: false})
    public manageTime: number

    @prop({ required: false})
    public manageTeam: number

    public getModel() {
        return this.getModelForClass(Final)
    }
}

export default Final
