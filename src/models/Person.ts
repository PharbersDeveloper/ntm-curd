"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"
import Place from "./Place"

class Person extends Typegoose implements IModelBase<Person> {
    @prop({ required: true })
    public name?: string

    @prop({ required: true })
    public age: number

    @prop({ ref: Place, required: true })
    public place: Ref<Place>

    public getModel() {
        return this.getModelForClass(Person)
    }
}

export default Person
