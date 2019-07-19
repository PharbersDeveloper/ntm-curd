"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import Answer from "./Answer"
import IModelBase from "./modelBase"

class Period extends Typegoose implements IModelBase<Period> {
    @prop({ required: true })
    public name: string

    @arrayProp( { itemsRef: Answer, required: true } )
    public answers: Array<Ref<Answer>>

    public getModel() {
        return this.getModelForClass(Period)
    }
}

export default Period
