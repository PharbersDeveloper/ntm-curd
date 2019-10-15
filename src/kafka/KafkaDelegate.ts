"use strict"

import axios, { AxiosInstance, AxiosStatic } from "axios"
import bodyParser, { json } from "body-parser"
import { KfkConf } from "../configFactory/kfkConf"
import PhLogger from "../logger/phLogger"
import phLogger from "../logger/phLogger"

export default class KafkaDelegate {

    private kcf: KfkConf = null
    private instance: AxiosInstance = null

    constructor(kfkConf: KfkConf) {
        this.kcf = kfkConf
    }

    public async pushMessage(value: object) {
        axios.post(this.kcf.brokerLst + "/topics/" + this.kcf.kafkaTopic, value, {
            headers: {
                "Accept": "application/vnd.kafka.v2+json",
                "Content-Type": "application/vnd.kafka.json.v2+json"
            }
        }).then((x) => {
            phLogger.info(x)
        } ).catch((ex) => {
            phLogger.error(ex)
        } )
    }
}
