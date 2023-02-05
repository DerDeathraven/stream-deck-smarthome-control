import { openStreamDeck } from "@elgato-stream-deck/node";
import { MqttHandler } from "./handlers/MqttHandler";
import { readConfig } from "./utils/configUtils";
import { setCleanStart } from "./utils/streamdeckUtils";
import { executeTypeSpecificFunction } from "./utils/buttonUtils";
import { HTTPHandler } from "./handlers/HTTPHandler";

export const streamDeck = openStreamDeck();
export const streamDeckConfig = readConfig(streamDeck);
export const mqttHandler = new MqttHandler();
export const httpHandler = new HTTPHandler();

streamDeck.on("error", (error) => console.error(error));

setCleanStart(streamDeck, streamDeckConfig);

streamDeck.on("down", (keyindex) => {
  if (!streamDeckConfig.streamdeckConfig.buttonSettings[keyindex]) {
    console.log("[DECK] pressed empty key", keyindex);
    return;
  }

  const buttonSetting =
    streamDeckConfig.streamdeckConfig.buttonSettings[keyindex];
  executeTypeSpecificFunction(buttonSetting);
});
