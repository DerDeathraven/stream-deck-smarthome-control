import { StreamDeck } from "@elgato-stream-deck/node";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { MQTT_SERVER } from "../const";
import { Config, StreamdeckConfig } from "../model/config";
import { streamDeckConfig } from "../index";

export function readConfig(streamDeck: StreamDeck) {
  if (existsSync(resolve("./config.json"))) {
    const config = JSON.parse(
      readFileSync(resolve("./config.json"), "utf8")
    ) as Config;
    return config.streamdeckConfig.streamdeckModel === streamDeck.MODEL
      ? config
      : createConfig(streamDeck);
  }
  return createConfig(streamDeck);
}

function createConfig(streamDeck: StreamDeck) {
  return {
    mqttAdress: MQTT_SERVER,
    headless: false,
    httpPort: 4000,
    pictureFolder: "./images",
    streamdeckConfig: {
      baseSettings: {
        brightness: {
          baseValue: 50,
          activeValue: 50,
          protocol: "MQTT",
          path: "streamdeck/brightness",
        },
      },
      streamdeckModel: streamDeck.MODEL,
      buttonSettings: [],
    },
  } as Config;
}

export function setNewDeckConfig(config: StreamdeckConfig) {
  streamDeckConfig.streamdeckConfig = config;
  saveConfig();
}

export function saveConfig() {
  writeFileSync(
    resolve("./config.json"),
    JSON.stringify(streamDeckConfig, null, 2)
  );
}
