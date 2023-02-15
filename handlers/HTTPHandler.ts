import express from "express";
import { streamDeckConfig } from "../index";
import { json, urlencoded } from "body-parser";
import { post } from "axios";
import { changeIcon, collectStreamdeckData } from "../utils/streamdeckUtils";
import {
  getStreamDeckDeviceInfo,
  getStreamDeckInfo,
} from "@elgato-stream-deck/node";
import { setNewDeckConfig } from "../utils/configUtils";

export class HTTPHandler {
  client: any;
  routeMap: Record<string, number> = {};
  constructor() {
    this.client = express();
    this.routeMap = {};

    this.client.use(json());
    this.client.use(urlencoded({ extended: false }));

    this.setHandlers();
    this.client.listen(streamDeckConfig.httpPort, () => {
      console.log("[HTTP] Listening on port " + streamDeckConfig.httpPort);
    });
  }
  send(adress: string, payload: string) {
    try {
      post(adress, { payload });
    } catch (e) {
      console.log(e);
    }
  }
  setHandlers() {
    for (const route in this.routeMap) {
      this.client.post("/api/buttons" + route, (req: Request, res: any) => {
        if (!req.body) return;
        const body = req.body;
        const index = this.routeMap[route];
        const button = streamDeckConfig.streamdeckConfig.buttonSettings[index];
        //@ts-ignore
        button.typeSpecifigConfig.state = !!body.payload;
        changeIcon(index);
        res.status(200);
        res.send("OK");
      });
    }
    this.client.get("/api/state", (req: Request, res: any) => {
      res.status(200);
      res.send(JSON.stringify(streamDeckConfig.streamdeckConfig));
    });
    this.client.get("/api/streamdeck-info", (req: Request, res: any) => {
      res.status(200);
      const streamdeckInfo = collectStreamdeckData();
      res.send(JSON.stringify(streamdeckInfo));
    });
    this.client.post("/api/state", (req: Request, res: any) => {
      if (!req.body) return;
      const body = req.body;
      //@ts-ignore
      setNewDeckConfig(body);
      console.log("worked");
      res.status(200);
      res.send(JSON.stringify(streamDeckConfig.streamdeckConfig));
    });
  }

  attachListner(index: number) {
    const path =
      streamDeckConfig.streamdeckConfig.buttonSettings[index].typeSpecifigConfig
        .incomingPath;
    this.routeMap[path] = index;
    this.setHandlers();
  }
  setBrightnessListner() {}
}
