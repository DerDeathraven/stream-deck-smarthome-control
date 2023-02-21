import { MqttHandler } from "../handlers/MqttHandler";
import { HTTPHandler } from "../handlers/HTTPHandler";

export function getMessageHandler(type: string) {
  const handlerMap: Record<string, Function> = {
    MQTT: () => MqttHandler.getHandler(),
    HTTP: () => HTTPHandler.getHandler(),
  };
  if (handlerMap[type]) return handlerMap[type]();
  return;
}
