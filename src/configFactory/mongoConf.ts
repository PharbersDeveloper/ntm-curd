"use strict"
import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("MongoConf")
export class MongoConf {

    @JsonProperty("algorithm", String)
    public algorithm: string = undefined

    @JsonProperty("host", String)
    public host: string = undefined

    @JsonProperty("port", Number)
    public port: number = undefined

    @JsonProperty("username", String)
    public username: string = undefined

    @JsonProperty("pwd", String)
    public pwd: string = undefined

    @JsonProperty("coll", String)
    public coll: string = undefined

    @JsonProperty("auth", Boolean)
    public auth: boolean = false
}
