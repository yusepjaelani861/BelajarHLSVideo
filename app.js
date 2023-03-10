const app = require("express")();
const fs = require("fs");
const HLSServer = require("hls-server");
const cors = require("cors");
var http = require("http");
const httpAttach = require("http-attach");

app.use(cors({ 
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://vue.test", "http://192.168.0.176:3000"],
    credentials: true
}));

const server = http.createServer(app);

// new hls(server, {
//   provider: {
//     exists: (req, cb) => {
//       const ext = req.url.split(".").pop();

//       if (ext !== "m3u8" && ext !== "ts") {
//         return cb(null, true);
//       }

//       fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
//         if (err) {
//           console.log("File not exist");
//           return cb(null, false);
//         }
//         cb(null, true);
//       });
//     },
//     getManifestStream: (req, cb) => {
//       const stream = fs.createReadStream(__dirname + req.url);
//       cb(null, stream);
//     },
//     getSegmentStream: (req, cb) => {
//       const stream = fs.createReadStream(__dirname + req.url);
//       cb(null, stream);
//     },
//   },
// });

var hls = new HLSServer(server, {
    path: "/stream",     // Base URI to output HLS streams
    dir: "videos",       // Directory that input files are stored
});

function yourMiddleware (req, res, next) {
    // set your headers here
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
}

httpAttach(server, yourMiddleware);
server.listen(80);