"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"
import Period from "./Period"
import Proposal from "./Proposal"
import Result from "./Result"

class Project extends Typegoose implements IModelBase<Project> {
    @prop({ required: true })
    public accountId: string

    @prop({ ref: Proposal, required: true })
    public proposal: Ref<Proposal>

    @prop({ required: true })
    public current: number

    @prop({ required: true })
    public pharse: number

    @prop({ required: true })
    public status: number

    @prop({ required: true })
    public lastUpdate: number

    @arrayProp({ itemsRef: Period, required: true })
    public periods: Array<Ref<Period>>

    @arrayProp({ itemsRef: Result, required: true })
    public results: Array<Ref<Result>>

    public getModel() {
        return this.getModelForClass(Project)
    }
}

export default Project
