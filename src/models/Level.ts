"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import Image from "./Image"
import IModelBase from "./modelBase"

class Level extends Typegoose implements IModelBase<Level> {
    @prop({ required: true })
    public rank: string

    @prop({ ref: Image, required: true})
    public rankImg: Ref<Image>

    @prop({ ref: Image, required: true})
    public awardImg: Ref<Image>

    public getModel() {
        return this.getModelForClass(Level)
    }
}

export default Level
