const http = require("http");
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.end(`<h1>Hello Node</h1>`);
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`serveris running on port: ${PORT}`);
});
