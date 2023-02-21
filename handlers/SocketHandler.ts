import { Server, Socket } from "socket.io";

export class SocketHandler {
  private socket: Server;
  static instance: SocketHandler;
  constructor(httpServer: any) {
    this.socket = new Server(httpServer);
    this.socket.on("connection", (socket: Socket) => {
      console.log("[SOCKET] connected");
    });
    SocketHandler.instance = this;
  }
  static getHandler(): SocketHandler {
    return SocketHandler.instance;
  }
  sendToClient(topic: string, data: string) {
    this.socket.emit(topic, data);
  }
}
