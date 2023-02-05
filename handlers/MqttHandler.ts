import { MqttClient, connect } from "mqtt";
import { MQTT_SERVER } from "../const";
import { streamDeckConfig } from "../index";
import { changeIcon } from "../utils/streamdeckUtils";

export class MqttHandler {
  public client: MqttClient;
  public topicMap: Record<string, number> = {};
  constructor() {
    this.client = connect(MQTT_SERVER);
    this.topicMap = {};

    this.client.on("connect", () => {
      console.log("[MQTT] connected");
      this.client.subscribe("streamdeck/buttons/#");
    });
    this.setHandler();
  }
  send(topic: string, message: string) {
    this.client.publish(topic, `${message}`);
  }
  attachListner(index: number) {
    const topic =
      streamDeckConfig.streamdeckConfig.buttonSettings[index].typeSpecifigConfig
        .incomingPath;
    this.topicMap[topic] = index;
  }
  setHandler() {
    this.client.on("message", (topic: string, message: string) => {
      message = message.toString();
      const index = this.topicMap[topic];
      if (index === undefined) return;
      const button = streamDeckConfig.streamdeckConfig.buttonSettings[index];
      button.typeSpecifigConfig.state = message == "true";

      changeIcon(index);
    });
  }
}
