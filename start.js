var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

let users = [];
let rooms = [];

app.get("/", (req, res) => {
  res.send({ ok: true }).status(200);
});

io.on("connection", (socket) => {
  console.log(socket);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat_message", (data) => {
    io.emit("chat_message", data);
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:9080");
});
