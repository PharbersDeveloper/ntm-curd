"use strict"
import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("EnvConf")
export class EnvConf {

    @JsonProperty("oauthHost", String)
    public oauthHost: string = undefined

    @JsonProperty("oauthPort", String)
    public oauthPort: string = undefined

    @JsonProperty("oauthApiNamespace", String)
    public oauthApiNamespace: string = undefined

    @JsonProperty("kafkaBrokerList", String)
    public kafkaBrokerList: string = undefined

    @JsonProperty("kafkaTopic", String)
    public kafkaTopic: string = undefined

    @JsonProperty("kafkaSecretsDir", String)
    public kafkaSecretsDir: string = undefined

    @JsonProperty("kafkaPassword", String)
    public kafkaPassword: string = undefined

    @JsonProperty("schemaRegisterHost", String)
    public schemaRegisterHost: string = undefined

    @JsonProperty("httpCallUrl", String)
    public httpCallUrl: string = undefined

    @JsonProperty("httpCallRUrl", String)
    public httpCallRUrl: string = undefined

}
