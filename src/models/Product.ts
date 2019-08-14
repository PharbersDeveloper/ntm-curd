"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import Image from "./Image"
import IModelBase from "./modelBase"
import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject("Product")
class Product extends Typegoose implements IModelBase<Product> {
    
    @JsonProperty("name", String)
    @prop({ required: true })
    public name: string = ""

    @JsonProperty("productCategory", String)
    @prop({ required: true })
    public productCategory: string = ""

    @JsonProperty("medicateCategory", String)
    @prop({ required: true })
    public medicateCategory: string = ""

    @JsonProperty("producer", String)
    @prop({ required: true })
    public producer: string = ""

    @prop({ ref: Image, required: true })
    public avatar: Ref<Image>

    @JsonProperty("safety", String)
    @prop({ required: false, default: "" })
    public safety: string = ""

    @JsonProperty("effectiveness", String)
    @prop({ required: false, default: "" })
    public effectiveness: string = ""

    @JsonProperty("convenience", String)
    @prop({ required: false, default: "" })
    public convenience: string = ""

    @JsonProperty("productType", Number)
    @prop({ required: true })
    public productType: number = 0

    @JsonProperty("priceType", String)
    @prop({ required: true })
    public priceType: string = ""

    @JsonProperty("price", Number)
    @prop({ required: true })
    public price: number = 0

    @JsonProperty("cost", Number)
    @prop({ required: true })
    public cost: number = 0

    @JsonProperty("launchDate", String)
    @prop({ required: true })
    public launchDate: String = ""

    @JsonProperty("treatmentArea", String)
    @prop({ required: true })
    public treatmentArea: string = ""

    @JsonProperty("feature", String)
    @prop({ required: true })
    public feature: string = ""

    @JsonProperty("targetDepartment", String)
    @prop({ required: false, default: "" })
    public targetDepartment: string = ""

    @JsonProperty("patentDescribe", String)
    @prop({ required: false, default: "" })
    public patentDescribe: string = ""

    @JsonProperty("costEffective", String)
    @prop({ required: false, default: "" })
    public costEffective: string = ""

    @JsonProperty("lifeCycle", String)
    @prop({ required: true })
    public lifeCycle: string = ""

    public getModel() {
        return this.getModelForClass(Product)
    }
}

export default Product
