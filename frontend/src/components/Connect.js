import { io } from "socket.io-client";
import { useEffect, useState } from "react";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <input onChange={(e) => setCode(e.target.value)} />
      <button onClick={createRoom}>Criar sala</button>
      <button onClick={joinRoom}>Entrar em uma sala</button>
    </div>
  );
};
