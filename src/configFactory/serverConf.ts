"use strict"
import {JsonObject, JsonProperty} from "json2typescript"
import { EnvConf } from "./envConf"
import { ModelConf } from "./modelConf"
import { MongoConf } from "./mongoConf"

@JsonObject("ServerConf")
export class ServerConf {

    @JsonProperty("models", [ModelConf])
    public models: ModelConf[] = undefined

    @JsonProperty("mongo", MongoConf)
    public mongo: MongoConf = undefined

    @JsonProperty("env", EnvConf)
    public env: EnvConf = undefined
}
