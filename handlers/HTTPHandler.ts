import express from "express";
import { streamDeckConfig } from "../index";
import { json, urlencoded } from "body-parser";
import { post } from "axios";
import { changeIcon } from "../utils/streamdeckUtils";

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
    post(adress, { payload });
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
  }

  attachListner(index: number) {
    const path =
      streamDeckConfig.streamdeckConfig.buttonSettings[index].typeSpecifigConfig
        .incomingPath;
    this.routeMap[path] = index;
    this.setHandlers();
  }
}
