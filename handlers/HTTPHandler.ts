export class HTTPHandler {
  constructor() {}
  send(adress: string, payload: string) {
    fetch(adress, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    });
  }
  attachListner(index: number) {}
}
