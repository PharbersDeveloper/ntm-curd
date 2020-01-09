"use strict"
import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("ModelConf")
export class ModelConf {
    @JsonProperty("file", String)
    public file: string = undefined

    @JsonProperty("reg", String)
    public reg: string = undefined
}
