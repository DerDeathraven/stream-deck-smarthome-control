import { StreamDeck } from "@elgato-stream-deck/node";
import { Config } from "../model/config";
import { mqttHandler, streamDeck, streamDeckConfig } from "../index";
import { httpHandler } from "../index";

export async function setCleanStart(streamDeck: StreamDeck, config: Config) {
  if (!config.streamdeckConfig.buttonSettings.length) {
    await streamDeck.clearPanel();
    return;
  }
  config.streamdeckConfig.buttonSettings.forEach((button, index) => {
    if (button.type === "button") return;
    const handler = button.protocol == "MQTT" ? mqttHandler : httpHandler;
    handler.attachListner(index);
  });

  //TODO
}

export function changeIcon(index: number) {
  const state =
    streamDeckConfig.streamdeckConfig.buttonSettings[index].typeSpecifigConfig
      .state;
  if (state === undefined) return;
  if (state) {
    streamDeck.fillKeyColor(index, 0, 255, 0);
  } else {
    streamDeck.fillKeyColor(index, 255, 0, 0);
  }
}
