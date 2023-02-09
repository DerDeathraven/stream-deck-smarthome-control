import { MqttClient, connect } from "mqtt";
import { MQTT_SERVER } from "../const";
import { streamDeck, streamDeckConfig } from "../index";
import { changeIcon, setBrightness } from "../utils/streamdeckUtils";

export class MqttHandler {
  public client: MqttClient;
  public topicMap: Record<string, number | string> = {};
  public logs: string[] = [];
  constructor() {
    this.client = connect(MQTT_SERVER);
    this.topicMap = {};

    this.client.on("connect", () => {
      console.log("[MQTT] connected");
      this.client.subscribe("streamdeck/#");
    });
    this.setHandler();
  }
  send(topic: string, message: string) {
    this.logs.push(`[${new Date().toISOString()}] ${topic}: ${message}`);
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
      if (typeof index === "number") {
        const button = streamDeckConfig.streamdeckConfig.buttonSettings[index];
        button.typeSpecifigConfig.state = message == "true";
        changeIcon(index);
      } else {
        switch (index) {
          case "brightness":
            let level = parseInt(message);
            level = level == 0 ? 1 : level;
            streamDeckConfig.streamdeckConfig.baseSettings.brightness.activeValue =
              level;
            setBrightness();
            break;
        }
      }
    });
  }
  setBrightnessListner(path: string) {
    this.topicMap[path] = "brightness";
  }
}
