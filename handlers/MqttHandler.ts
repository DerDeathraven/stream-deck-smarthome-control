import { MqttClient, connect } from "mqtt";
import { MQTT_SERVER } from "../const";
import { StreamDeckFacade } from "./StreamDeckFacade";
import { SocketHandler } from "./SocketHandler";

export class MqttHandler {
  public client: MqttClient;
  public topicMap: Record<string, string> = {};
  public buttonTopicMap: Record<string, number[]> = {};

  public logs: string[] = [];
  static instance: MqttHandler;
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
  static intitalize(): void {
    MqttHandler.instance = new MqttHandler();
  }
  static getHandler(): MqttHandler {
    return MqttHandler.instance;
  }

  send(topic: string, message: string) {
    this.logs.push(`[${new Date().toISOString()}] ${topic}: ${message}`);
    this.client.publish(topic, `${message}`);
  }

  attachListner(index: number) {
    const streamDeckFacade = StreamDeckFacade.getInstance();
    const button = streamDeckFacade.getButton(index);
    if (!button) return;
    const topic = button.typeSpecifigConfig.incomingPath;
    const entry = this.buttonTopicMap[topic];
    this.buttonTopicMap[topic] = entry ? [...entry, index] : [index];
  }

  setHandler() {
    const streamDeckFacade = StreamDeckFacade.getInstance();
    const socketHandler = SocketHandler.getHandler();
    this.client.on("message", (topic: string, message: string) => {
      message = message.toString();
      if (topic in this.buttonTopicMap) {
        const indexArr = this.buttonTopicMap[topic];
        indexArr.forEach((index) => {
          const button = streamDeckFacade.getButton(index);
          if (!button) return;
          button.typeSpecifigConfig.state = message == "true";
          streamDeckFacade.changeIcon(index);
          // socketHandler.sendToClient("buttonStateChange", String(index));
        });
      } else if (topic in this.topicMap) {
        const entry = this.topicMap[topic];
        switch (entry) {
          case "brightness":
            let level = parseInt(message);
            level = level == 0 ? 1 : level;
            streamDeckFacade.setBrightness(level);
            break;
        }
      }
    });
  }

  setBrightnessListner(path: string) {
    this.topicMap[path] = "brightness";
  }
}
