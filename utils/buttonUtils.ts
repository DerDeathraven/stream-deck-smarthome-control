import { httpHandler, mqttHandler } from "../index";
import { ButtonSetting } from "../model/config";
import { changeIcon } from "./streamdeckUtils";

export const functionMap: Record<string, Function> = {
  button,
  buttonSwitch,
} as const;

export function executeTypeSpecificFunction(buttonSetting: ButtonSetting) {
  functionMap[buttonSetting.type].call("", buttonSetting);
}

function button(buttonSetting: ButtonSetting) {
  const { protocol, typeSpecifigConfig } = buttonSetting;
  const handler = protocol == "MQTT" ? mqttHandler : httpHandler;
  console.log(buttonSetting);
  handler.send(typeSpecifigConfig.path, typeSpecifigConfig.message || "true");
}

function buttonSwitch(buttonSetting: ButtonSetting) {
  const { protocol, typeSpecifigConfig } = buttonSetting;
  const handler = protocol == "MQTT" ? mqttHandler : httpHandler;
  typeSpecifigConfig.state = !typeSpecifigConfig.state;
  handler.send(
    typeSpecifigConfig.path,
    typeSpecifigConfig.message || typeSpecifigConfig.state
  );
}
