const http = require("http");
const routes = require("./routes");
// function rqListener(req, res) {}
// http.createServer(rqListener);

// const server = http.createServer(function (req, res) {
//   //console.log(req.url, req.method, req.headers);
//   //   process.exit();

//   const url = req.url;
//   const method = req.method;
// });

const server = http.createServer(routes);
server.listen(3000);
