export type Config = {
  streamdeckConfig: StreamdeckConfig;
  mqttAdress: string;
  headless: boolean;
  httpPort: number;
  pictureFolder: string;
};
export type StreamdeckConfig = {
  streamdeckModel: string;
  buttonSettings: ButtonSetting[];
};
export type ButtonSetting = {
  type: string;
  protocol: "MQTT" | "HTTP";
  icons: string[];
  typeSpecifigConfig: any;
};
