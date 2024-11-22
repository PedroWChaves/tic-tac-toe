// importações
const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
const util = require("./util");

const MAX_NUM_PLAYERS = 2; // num máximo de jogadores na sala

// tabela hash com código da sala e jogadores
const rooms = {};

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  // cria uma nova sala e adiciona o usuário
  socket.on("create-room", () => {
    const code = util.randomCode(6);
    rooms[code] = [socket.id];
    console.log(rooms);

    socket.join(code);
    socket.emit("update-room", { code, players: rooms[code] });
  });

  // adiciona o usuário em uma sala existente, se possível
  socket.on("join-room", ({ code }) => {
    if (!rooms[code]) {
      socket.emit("no-room", {
        code,
        message: `Nenhuma sala com código ${code} encontrada!`,
      });
      return;
    }

    if (rooms[code].length >= MAX_NUM_PLAYERS) {
      socket.emit("no-room", {
        code,
        message: `A sala ${code} já está cheia!`,
      });
      return;
    }

    rooms[code].push(socket.id);
    console.log(rooms);

    socket.join(code);
    // socket.emit("update-room", { code, players: rooms[code] });
    io.to(code).emit("update-room", { code, players: rooms[code] });
  });

  // remove o usuário da sala ao desconectar
  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");

    Object.keys(rooms).forEach((code) => {
      if (rooms[code].includes(socket.id)) {
        rooms[code] = rooms[code].filter((id) => id != socket.id);
        if (rooms[code].length === 0) delete rooms[code];
        else
          socket.to(code).emit("update-room", { code, players: rooms[code] });
      }
    });
  });

  socket.on("move", (data) => {
    console.log(data);
    Object.keys(rooms).forEach((code) => {
      if (rooms[code].includes(socket.id)) {
        socket.to(code).emit("move", data);
      }
    });
  });

  socket.on("start-game", () => {
    const num = Math.round(Math.random());
    Object.keys(rooms).forEach((code) => {
      if (rooms[code].includes(socket.id)) {
        io.to(rooms[code][0]).emit("init", {
          simbolo: "X",
          jogando: num === 0,
        });
        io.to(rooms[code][1]).emit("init", {
          simbolo: "O",
          jogando: num === 1,
        });
      }
    });
  });
});

http.listen(8080, "0.0.0.0", () =>
  console.log("listening on http://localhost:8080")
);
