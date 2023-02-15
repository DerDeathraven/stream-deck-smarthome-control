export class LoggingHandler {
  private logs: string[];
  constructor() {
    this.logs = [];
    //@ts-ignore
    console.newLog = console.log;
    console.log = (message) => {
      this.logs.push(message);
      //@ts-ignore
      console.newLog(message);
    };
  }
  clear() {
    this.logs = [];
  }
  dump() {
    //@ts-ignore
    console.newLog(this.logs);
  }
}
