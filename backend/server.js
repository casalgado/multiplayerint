const express = require("express");
const app = express();
const port = 4000;

const server = app.listen(`${port}`, function() {
  console.log(`Server started on port ${port}`);
});

const io = require("socket.io")(server);

var players = {};

io.on("connection", (socket) => {
  socket.on("new player", function() {
    players[socket.id] = {
      name: socket.id,
      x: 300,
      y: 300,
    };
  });
  socket.on("movement", function(data) {
    data = data || {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
  socket.on("disconnect", function() {
    delete players[socket.id];
  });
});

setInterval(function() {
  console.log(players);
  io.sockets.emit("state", players);
}, 1000 / 60);

// function getRandomValue() {
//   return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
// }
// setInterval(() => {
//   console.log("in server");
//   socket.broadcast.emit("newdata", getRandomValue());
// }, 1000);
