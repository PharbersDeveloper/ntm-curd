"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"
import Proposal from "./Proposal"

class UsableProposal extends Typegoose implements IModelBase<UsableProposal> {
    @prop({ required: true })
    public accountId?: string

    @prop({ ref: Proposal, required: true })
    public proposal: Ref<Proposal>

    public getModel() {
        return this.getModelForClass(UsableProposal)
    }
}

export default UsableProposal
