var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send({ ok: true }).status(200);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat_message", (data) => {
    io.emit("chat_message", data);
  });
});

http.listen(9080, () => {
  console.log("listening on *:9080");
});
