"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttHandler = void 0;
const mqtt_1 = require("mqtt");
const const_1 = require("./const");
class MqttHandler {
    client;
    constructor() {
        this.client = (0, mqtt_1.connect)(const_1.MQTT_SERVER);
        this.client.on("connected", () => {
            console.log("[MQTT] connected");
        });
    }
}
exports.MqttHandler = MqttHandler;
