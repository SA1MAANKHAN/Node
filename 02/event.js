const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("new sale was there");
});

myEmitter.on("newSale", () => {
  console.log("Salmaan is Customer");
});

myEmitter.on("newSale", (e) => {
  console.log("Salmaan is salmaank" + e);
});

myEmitter.emit("newSale", 9);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("one");
  res.end("REQ reC");
});

server.on("request", () => {
  console.log("TWO");
});

server.on("close", () => {
  console.log("close");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting");
});
