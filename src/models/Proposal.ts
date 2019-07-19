"use strict"
import { Resource } from "json-api"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Product from "./Product"
import Requirement from "./Requirement"

class Proposal extends Typegoose implements IModelBase<Proposal> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public describe: string

    @prop({ required: true })
    public totalPhase: number

    @arrayProp({ items: String, required: true })
    public inputIds: string[]

    @arrayProp( { items: String } )
    public salesReportIds: string[]

    @arrayProp( { itemsRef: Product, required: true } )
    public products: Array<Ref<Product>>

    @arrayProp( { itemsRef: Hospital, required: true } )
    public targets: Array<Ref<Hospital>>

    @arrayProp( { itemsRef: Resource, required: true } )
    public resources: Array<Ref<Resource>>

    @arrayProp( { items: String } )
    public personnelAssessmentIds: string[]

    @prop({ ref: Requirement, required: true})
    public quota: Ref<Requirement>

    public getModel() {
        return this.getModelForClass(Proposal)
    }
}

export default Proposal
