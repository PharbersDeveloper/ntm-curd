"use strict"

// @ts-ignore
import { KafkaAvro } from "../../node_modules/kafka-avro/lib/kafka-avro.js"
import { KfkConf } from "../configFactory/kfkConf"
import PhLogger from "../logger/phLogger"

export default class KafkaDelegate {

    private kcf: KfkConf = null
    private producer: any = null

    constructor(kfkConf: KfkConf) {
        this.kcf = kfkConf
        this.setupKfkClient()
        this.producer = this.setupKfkProducer()
    }

    protected async setupKfkClient() {
        const avro = new KafkaAvro({
            kafkaBroker: this.kcf.brokerLst,
            schemaRegistry: this.kcf.schemaRegisterHost
        })
        return await avro.init()
    }

    protected async setupKfkProducer() {
        const path = process.env.PH_TS_SERVER_HOME + "/" + this.kcf.kafkaSecretsDir
        if (this.producer === null) {
            this.producer = await KafkaAvro.getProducer({
                "client.id": "ntm-curd",
                "dr_cb": true,
                "metadata.broker.list": this.kcf.brokerLst,
                "security.protocol": "SSL",
                "ssl.ca.location": `${path}snakeoil-ca-1.crt`,
                "ssl.certificate.location": `${path}kafkacat-ca1-signed.pem`,
                "ssl.key.location": `${path}kafkacat.client.key`,
                "ssl.key.password": this.kcf.kafkaPassword,
            })

            this.producer.on("disconnected", (arg: any) => {
                PhLogger.error("producer disconnected. " + JSON.stringify(arg))
            } )
        }
    }

    protected async pushMessage(value: object) {
        // if partition is set to -1, librdkafka will use the default partitioner
        const partition = -1
        try {
            this.producer.produce(
                // Topic to send the message to
                this.kcf.kafkaTopic,
                // optionally we can manually specify a partition for the message
                // this defaults to -1 - which will use librdkafka's default partitioner
                // (consistent random for keyed messages, random for unkeyed messages)
                partition,
                // Message to send. Must be a buffer
                // Buffer.from("balabala1"),
                value,
                // for keyed messages, we also specify the key - note that this field is optional
                null,
                // you can send a timestamp here. If your broker version supports it,
                // it will get added. Otherwise, we default to 0
                Date.now(),
                // you can send an opaque token here, which gets passed along
                // to your delivery reports
                (err: any, offset: any) => {
                    PhLogger.error(err)
                    PhLogger.error(offset)
                }
            )
        } catch (err) {
            PhLogger.error("A problem occurred when sending our message")
            PhLogger.error(err)
        }
    }
}
