"use strict"
import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("EnvConf")
export class EnvConf {

    @JsonProperty("oauthHost", String)
    public oauthHost: string = undefined

    @JsonProperty("oauthPort", Number)
    public oauthPort: number = undefined

    @JsonProperty("oauthApiNamespace", String)
    public oauthApiNamespace: string = undefined

    @JsonProperty("kafkaBrokerList", String)
    public kafkaBrokerList: string = undefined

}
