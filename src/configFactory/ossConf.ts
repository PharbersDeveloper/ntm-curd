"use strict"
import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("ossConf")
export class OssConf {
    @JsonProperty("accessKeyId", String)
    public accessKeyId: string = undefined

    @JsonProperty("accessKeySecret", String)
    public accessKeySecret: string = undefined

    @JsonProperty("bucket", String)
    public bucket: string = undefined

    @JsonProperty("region", String)
    public region: string = undefined
}
