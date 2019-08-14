"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import Image from "./Image"
import IModelBase from "./modelBase"
import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject("Resource")
class Resource extends Typegoose implements IModelBase<Resource> {
    
    @JsonProperty("name", String)
    @prop({ required: true })
    public name: string = ""

    @JsonProperty("gender", Number)
    @prop({ required: true })
    public gender: number = 0

    @JsonProperty("age", Number)
    @prop({ required: true })
    public age: number = 0

    @JsonProperty("education", Number)
    @prop({ required: true })
    public education: string = ""

    @JsonProperty("professional", String)
    @prop({ required: true })
    public professional: string = ""

    @JsonProperty("advantage", String)
    @prop({ required: false, default: ""})
    public advantage: string = ""

    @JsonProperty("evaluation", String)
    @prop({ required: true })
    public evaluation: string = ""

    @JsonProperty("experience", Number)
    @prop({ required: true })
    public experience: number = 0

    @JsonProperty("totalTime", Number)
    @prop({ required: true })
    public totalTime: number = 100

    @JsonProperty("entryTime", Number)
    @prop({ required: true })
    public entryTime: number = 1

    @prop({ ref: Image, required: true })
    public avatar: Ref<Image>

    public getModel() {
        return this.getModelForClass(Resource)
    }
}

export default Resource
