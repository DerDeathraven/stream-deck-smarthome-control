declare let console: Console & {
  newLog: (...args: any[]) => void;
};

export class LoggingHandler {
  private logs: string[];
  static instance: LoggingHandler;
  constructor() {
    this.logs = [];
    console.newLog = console.log;
    console.log = (message) => {
      this.logs.push(message);
      console.newLog(message);
    };
  }
  static inizalize(): void {
    LoggingHandler.instance = new LoggingHandler();
  }
  static getHandler(): LoggingHandler {
    return LoggingHandler.instance;
  }
  clear() {
    this.logs = [];
  }
  dump() {
    console.newLog(this.logs);
  }
}
