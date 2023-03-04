import express, { Request } from "express";
import { json, urlencoded } from "body-parser";
import { AxiosError, post } from "axios";
import { setNewDeckConfig } from "../utils/configUtils";
import { Server } from "http";
import { SocketHandler } from "./SocketHandler";
import { StreamDeckFacade } from "./StreamDeckFacade";
import fileUpload from "express-fileupload";
/**
 * Singelton class
 */
export class HTTPHandler {
  static instance: HTTPHandler;
  socketHandler: SocketHandler;
  client: any;
  routeMap: Record<string, number> = {};
  httpServer: any;
  constructor() {
    const streamDeckFacade = StreamDeckFacade.getInstance();

    this.client = express();

    this.httpServer = new Server(this.client);
    this.routeMap = {};
    this.socketHandler = new SocketHandler(this.httpServer);
    this.client.use(json());
    this.client.use(urlencoded({ extended: false }));
    this.client.use(fileUpload());
    this.client.use(express.static("public"));

    this.setHandlers();
    const port = streamDeckFacade.config.httpPort;
    this.httpServer.listen(port, () => {
      console.log("[HTTP] Listening on port " + port);
    });
  }

  static initalize(): void {
    if (!HTTPHandler.instance) {
      HTTPHandler.instance = new HTTPHandler();
    }
  }

  static getHandler(): HTTPHandler {
    if (!HTTPHandler.instance) HTTPHandler.initalize();
    return HTTPHandler.instance;
  }

  async send(adress: string, payload: string) {
    try {
      await post(adress, { payload });
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  }
  setHandlers() {
    const streamDeckFacade = StreamDeckFacade.getInstance();

    for (const route in this.routeMap) {
      this.client.post("/api/buttons" + route, (req: Request, res: any) => {
        if (!req.body) return;

        const body = req.body;
        const index = this.routeMap[route];
        const button = streamDeckFacade.getButton(index);
        //@ts-ignore
        button.typeSpecifigConfig.state = body.payload;
        const sendMessage = {
          index: String(index),
          message: body.payload,
        };
        this.socketHandler.sendToClient(
          "buttonStateChange",
          JSON.stringify(sendMessage)
        );
        streamDeckFacade.changeIcon(index);
        res.status(200);
        res.send("OK");
      });
    }
    this.client.get("/api/state", (req: Request, res: any) => {
      res.status(200);
      res.send(JSON.stringify(streamDeckFacade.config.streamdeckConfig));
    });
    this.client.get("/api/streamdeck-info", (req: Request, res: any) => {
      res.status(200);
      const streamdeckInfo = streamDeckFacade.collectStreamdeckData();
      res.send(JSON.stringify(streamdeckInfo));
    });
    this.client.post("/api/state", (req: Request, res: any) => {
      if (!req.body) return;
      const body = req.body;
      //@ts-ignore
      setNewDeckConfig(body);
      res.status(200);
      res.send(JSON.stringify(streamDeckFacade.config.streamdeckConfig));
    });
    this.client.post("/api/uploadIcon", (req: Request, res: any) => {
      console.log(req.files);
      res.status(200);
      res.send("OK");
    });
  }

  attachListner(index: number) {
    const streamDeckFacade = StreamDeckFacade.getInstance();

    const button = streamDeckFacade.getButton(index);
    if (!button) return;
    const path = button.typeSpecifigConfig.incomingPath;
    this.routeMap[path] = index;
    this.send(button.typeSpecifigConfig.onBootup, "true");
    this.setHandlers();
  }
  setBrightnessListner() {}
}
