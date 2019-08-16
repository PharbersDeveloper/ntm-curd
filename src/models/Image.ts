"use strict"
import { JsonObject, JsonProperty } from "json2typescript"
import { prop, Ref, Typegoose } from "typegoose"
import IModelBase from "./modelBase"

@JsonObject("Image")
class Image extends Typegoose implements IModelBase<Image> {

    @JsonProperty("img", String)
    @prop({ required: true, default: "" })
    public img: string = ""

    @JsonProperty("tag", String)
    @prop({ required: true, default: "" })
    public tag: string = ""

    @JsonProperty("flag", Number)
    @prop({ required: true, default: 0 })
    public flag: number = 0

    public getModel() {
        return this.getModelForClass(Image)
    }
}

export default Image
