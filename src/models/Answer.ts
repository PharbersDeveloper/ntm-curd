"use strict"
import { prop, Ref, Typegoose } from "typegoose"
import { AnswerCategory } from "../enum/AnswerCategory"
import Hospital from "./Hospital"
import IModelBase from "./modelBase"
import Product from "./Product"
import Resource from "./Resource"

class Answer extends Typegoose implements IModelBase<Answer> {
    @prop({ enum: AnswerCategory, required: true })
    public category: AnswerCategory

    @prop({ default: -1, required: true })
    public salesTarget?: number

    @prop({ default: -1, required: true })
    public budget?: number

    @prop({ default: -1, required: true })
    public meetingPlaces?: number

    @prop({ default: -1, required: true })
    public visitTime?: number

    @prop({ default: -1, required: true })
    public assistAccessTime?: number

    @prop({ default: -1, required: true })
    public abilityCoach?: number

    @prop({ default: -1, required: true })
    public productKnowledgeTraining?: number

    @prop({ default: -1, required: true })
    public vocationalDevelopment?: number
    
    @prop({ default: -1, required: true })
    public regionTraining?: number
    
    @prop({ default: -1, required: true })
    public performanceTraining?: number

    @prop({ default: -1, required: true })
    public salesAbilityTraining?: number

    @prop({ default: -1, required: true })
    public strategAnalysisTime?: number

    @prop({ default: -1, required: true })
    public adminWorkTime?: number

    @prop({ default: -1, required: true })
    public clientManagementTime?: number

    @prop({ default: -1, required: true })
    public kpiAnalysisTime?: number

    @prop({ default: -1, required: true })
    public teamMeetingTime?: number

    @prop({ ref: Resource, default: null, required: true })
    public resource?: Ref<Resource>

    @prop({ ref: Product, default: null, required: true })
    public product?: Ref<Resource>

    @prop({ ref: Hospital, default: null, required: true })
    public target?: Ref<Hospital>

    public getModel() {
        return this.getModelForClass(Answer)
    }
}

export default Answer
