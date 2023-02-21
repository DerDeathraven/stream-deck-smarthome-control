export type IconConfig = {
  state: string;
  icon: string;
  color?: string;
};

export type Config = {
  streamdeckConfig: StreamdeckConfig;
  mqttAdress: string;
  headless: boolean;
  httpPort: number;
  pictureFolder: string;
};
export type StreamdeckConfig = {
  baseSettings: {
    brightness: {
      baseValue: number;
      activeValue: number;
      protocol?: "MQTT" | "HTTP";
      path?: string;
    };
  };
  streamdeckModel: string;
  buttonSettings: ButtonSetting[];
};
export type ButtonSetting = {
  type: string;
  protocol: "MQTT" | "HTTP";
  icons: IconConfig[];
  typeSpecifigConfig: any;
};
