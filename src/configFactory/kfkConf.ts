"use strict"

import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("KfkConf")
export class KfkConf {

    @JsonProperty("kafkaBrokerList", String)
    public brokerLst: string = undefined

    @JsonProperty("kafkaTopic", String)
    public kafkaTopic: string = undefined

    // @JsonProperty("kafkaSecretsDir", String)
    // public kafkaSecretsDir: string = undefined

    // @JsonProperty("kafkaPassword", String)
    // public kafkaPassword: string = undefined

    // @JsonProperty("schemaRegisterHost", String)
    // public schemaRegisterHost: string = undefined
}
