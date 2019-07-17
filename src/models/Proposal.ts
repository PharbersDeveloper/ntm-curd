"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

class Proposal extends Typegoose implements IModelBase<Proposal> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public describe: string

    @prop({ required: true })
    public totalPhase: number

    @prop({ required: true })
    public inputIds: string[]

    @prop( { } )
    public salesReportIds: string[]

    @prop( { } )
    public personnelAssessmentIds: string[]

    public getModel() {
        return this.getModelForClass(Proposal)
    }
}

export default Proposal
