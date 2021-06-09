const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // sol1
  //   fs.readFile("test-file.txt", (err, data) => {
  // if (err) console.log(err);
  // res.end(data);
  //   });
  //   sol2
  //   const readable = fs.createReadStream("tes-file.txt");
  //   readable.on("data", (chunck) => {
  //     res.write(chunck);
  //     readable.on("end", () => {
  //       res.end();
  //     });
  //     readable.on("error", (err) => {
  //       console.log(err);
  //       res.statusCode = 500;
  //       res.end("file not found!");
  //     });
  //   });
  // sol3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
