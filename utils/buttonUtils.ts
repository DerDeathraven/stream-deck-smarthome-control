import { HTTPHandler } from "../handlers/HTTPHandler";
import { MqttHandler } from "../handlers/MqttHandler";
import { ButtonSetting } from "../model/config";
import { getMessageHandler } from "./messagingHandlerUtils";

export const functionMap: Record<string, Function> = {
  button: buttonSwitch,
  buttonSwitch,
} as const;

export function executeTypeSpecificFunction(buttonSetting: ButtonSetting) {
  functionMap[buttonSetting.type].call("", buttonSetting);
}

function button(buttonSetting: ButtonSetting) {
  const mqttHandler = MqttHandler.getHandler();
  const httpHandler = HTTPHandler.getHandler();
  const { protocol, typeSpecifigConfig } = buttonSetting;
  const handler = protocol == "MQTT" ? mqttHandler : httpHandler;
  console.log(buttonSetting);
  handler.send(typeSpecifigConfig.path, typeSpecifigConfig.message || "true");
}

function buttonSwitch(buttonSetting: ButtonSetting) {
  const { protocol, typeSpecifigConfig } = buttonSetting;
  const handler = getMessageHandler(protocol);
  typeSpecifigConfig.state = getSendMessage(buttonSetting);
  handler.send(typeSpecifigConfig.path, typeSpecifigConfig.message || "true");
}

function getSendMessage(buttonSetting: ButtonSetting) {
  if (buttonSetting.typeSpecifigConfig.message)
    return buttonSetting.typeSpecifigConfig.message;
  return "true";
}
