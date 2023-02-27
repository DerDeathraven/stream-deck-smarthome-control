import { StreamDeck, openStreamDeck } from "@elgato-stream-deck/node";
import { ButtonSetting, Config } from "../model/config";
import { HTTPHandler } from "./HTTPHandler";
import { MqttHandler } from "./MqttHandler";
import { readConfig } from "../utils/configUtils";
import { executeTypeSpecificFunction } from "../utils/buttonUtils";
import { getMessageHandler } from "../utils/messagingHandlerUtils";
import { hexToRgb } from "../utils/colorUtils";

/**
 * Streamdeck instance handler
 */
export class StreamDeckFacade {
  static instance: StreamDeckFacade;

  private streamDeck: StreamDeck;
  public config: Config;
  constructor() {
    this.streamDeck = openStreamDeck();
    this.config = readConfig(this.streamDeck);
    // this.setCleanStart();
    this.streamDeck.on("error", (error) => console.error(error));
    this.streamDeck.on("down", (keyindex) => {
      const button = this.getButton(keyindex);
      if (!button?.typeSpecifigConfig.path) {
        console.log("[DECK] pressed empty key", keyindex);
        return;
      }
      executeTypeSpecificFunction(button);
    });
  }

  //---------Static Methods---------
  static getInstance(): StreamDeckFacade {
    if (!StreamDeckFacade.instance) {
      StreamDeckFacade.initalize();
    }
    return StreamDeckFacade.instance;
  }

  static initalize(): void {
    StreamDeckFacade.instance = new StreamDeckFacade();
  }

  //-----Getters and Setters-----
  getButton(index: number): ButtonSetting | undefined {
    return this.config.streamdeckConfig.buttonSettings[index];
  }

  //---------Methods---------
  public async setCleanStart() {
    if (!this.config.streamdeckConfig.buttonSettings.length) {
      await this.streamDeck.clearPanel();
      return;
    }
    this.config.streamdeckConfig.buttonSettings.forEach((button, index) => {
      if (button.type === "button") return;
      const handler = getMessageHandler(button.protocol);
      console.log(handler);
      handler.attachListner(index);
    });
    this.setBrightnessHandler();
    //TODO
  }

  changeIcon(index: number) {
    const button = this.config.streamdeckConfig.buttonSettings[index];
    const state = button.typeSpecifigConfig.state;
    if (state === undefined) return;
    const icon = button.icons.find((icon) => icon.state == `${state}`);
    if (icon && icon.color) {
      const { r, g, b } = hexToRgb(icon.color)!;
      this.streamDeck.fillKeyColor(index, r, g, b);
    } else {
      if (state) {
        this.streamDeck.fillKeyColor(index, 0, 255, 0);
      } else {
        this.streamDeck.fillKeyColor(index, 255, 0, 0);
      }
    }
  }

  setBrightness(level?: number) {
    if (level) {
      this.config.streamdeckConfig.baseSettings.brightness.activeValue = level;
    }
    level = this.config.streamdeckConfig.baseSettings.brightness.activeValue;
    this.streamDeck.setBrightness(level);
  }

  setBrightnessHandler() {
    const { protocol, path, baseValue } =
      this.config.streamdeckConfig.baseSettings.brightness;
    if (!path || !protocol) return;

    const handler = getMessageHandler(protocol);
    handler.setBrightnessListner(path);
    this.setBrightness(baseValue);
  }

  collectStreamdeckData() {
    const { KEY_COLUMNS, KEY_ROWS, NUM_ENCODERS } = this.streamDeck;
    const retObj = {
      KEY_COLUMNS,
      KEY_ROWS,
      NUM_ENCODERS,
    };
    return retObj;
  }
}
