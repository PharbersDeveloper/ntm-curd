"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"
import Proposal from "./Proposal"

class Project extends Typegoose implements IModelBase<Project> {
    @prop({ required: true })
    public accountId: number

    @prop({ ref: Proposal, required: true })
    public proposal: Ref<Proposal>

    @prop({ required: true })
    public current: number

    public getModel() {
        return this.getModelForClass(Project)
    }
}

export default Project
