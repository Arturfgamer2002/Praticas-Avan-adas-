const http = require("http");

console.log("Http...:" + http);

const hostname = "127.0.0.1";
console.log("Hostname...:" + hostname);
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http//${hostname}:${port}/`);
});
