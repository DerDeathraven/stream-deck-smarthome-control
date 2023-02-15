import { MqttClient, connect } from "mqtt";
import { MQTT_SERVER } from "../const";
import { streamDeck, streamDeckConfig } from "../index";
import { changeIcon, setBrightness } from "../utils/streamdeckUtils";

export class MqttHandler {
  public client: MqttClient;
  public topicMap: Record<string, string> = {};
  public buttonTopicMap: Record<string, number[]> = {};

  public logs: string[] = [];
  constructor() {
    this.client = connect(MQTT_SERVER);
    this.topicMap = {};
    this.buttonTopicMap = {};

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
    const entry = this.buttonTopicMap[topic];
    this.buttonTopicMap[topic] = entry ? [...entry, index] : [index];
  }

  setHandler() {
    this.client.on("message", (topic: string, message: string) => {
      message = message.toString();
      if (topic in this.buttonTopicMap) {
        const indexArr = this.buttonTopicMap[topic];
        indexArr.forEach((index) => {
          const button =
            streamDeckConfig.streamdeckConfig.buttonSettings[index];
          button.typeSpecifigConfig.state = message == "true";
          changeIcon(index);
        });
      } else if (topic in this.topicMap) {
        const entry = this.topicMap[topic];
        switch (entry) {
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
