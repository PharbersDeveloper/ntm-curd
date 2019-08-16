"use strict"
import { arrayProp, prop, Ref, Typegoose } from "typegoose"
import Answer from "./Answer"
import IModelBase from "./modelBase"
import Preset from "./Preset"
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

    @arrayProp( { itemsRef: Preset, default: []} )
    public presets?: Array<Ref<Preset>>

    public getModel() {
        return this.getModelForClass(Period)
    }
}

export default Period
