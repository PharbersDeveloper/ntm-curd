"use strict"
import { Resource } from "json-api"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import Evaluation from "./Evaluation"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Preset from "./Preset"
import Product from "./Product"
import Requirement from "./Requirement"
import Validation from "./Validation"

class Proposal extends Typegoose implements IModelBase<Proposal> {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public describe: string

    @prop({ required: true })
    public totalPhase: number

    @arrayProp( { itemsRef: Product, required: true } )
    public products: Array<Ref<Product>>

    @arrayProp( { itemsRef: Hospital, required: true } )
    public targets: Array<Ref<Hospital>>

    @arrayProp( { itemsRef: Resource, required: true } )
    public resources: Array<Ref<Resource>>

    @arrayProp( { itemsRef: Preset, required: true } )
    public presets: Array<Ref<Preset>>

    @arrayProp( { itemsRef: Evaluation, required: true } )
    public evaluations: Array<Ref<Evaluation>>

    @prop({ ref: Validation, required: true})
    public validations: Array<Ref<Validation>>

    @prop({ ref: Requirement, required: true})
    public quota: Ref<Requirement>

    public getModel() {
        return this.getModelForClass(Proposal)
    }
}

export default Proposal
