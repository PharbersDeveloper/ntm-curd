"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import Answer from "./Answer"
import IModelBase from "./modelBase"
import Report from "./Report"

class Period extends Typegoose implements IModelBase<Period> {

    @prop( { ref: Period, default: null} )
    public last?: Ref<Period>

    @prop({ required: true })
    public name: string

    @arrayProp( { itemsRef: Answer, required: true } )
    public answers: Array<Ref<Answer>>

    @arrayProp( { itemsRef: Report, required: true } )
    public reports: Array<Ref<Report>>

    public getModel() {
        return this.getModelForClass(Period)
    }
}

export default Period
