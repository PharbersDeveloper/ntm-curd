"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"
import Proposal from "./Proposal"

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

    public getModel() {
        return this.getModelForClass(Project)
    }
}

export default Project
