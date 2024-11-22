import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { SocketContext } from "../Context/Socket";

const socket = io("http://localhost:8080");

export const Connect = ({ setRoom }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.on("update-room", (data) => {
      console.log(data);
      setRoom(data);
    });
    socket.on("no-room", (data) => {
      alert(data.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createRoom = () => {
    socket.emit("create-room");
  };

  const joinRoom = () => {
    socket.emit("join-room", { code });
  };

  return (
    <SocketContext.Provider socket={socket}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <button className="button" onClick={createRoom}>
          Criar Sala
        </button>
        <p className="texto">Código:</p>
        <input
          className="roomInput"
          onChange={(e) => setCode(e.target.value)}
          placeholder="AB1234"
        />
        <button className="button" onClick={joinRoom}>
          Entrar
        </button>
      </div>
    </SocketContext.Provider>
  );
};
