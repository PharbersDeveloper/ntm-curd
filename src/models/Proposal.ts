"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Product from "./Product"

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

    @arrayProp( { items: String } )
    public personnelAssessmentIds: string[]

    public getModel() {
        return this.getModelForClass(Proposal)
    }
}

export default Proposal
