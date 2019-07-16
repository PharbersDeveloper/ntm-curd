"use strict"
import * as mongoose from "mongoose"
import { InstanceType } from "typegoose"

interface IModelBase<T> {
    getModel(): mongoose.Model<InstanceType<this>> & this & T
}

export default IModelBase
