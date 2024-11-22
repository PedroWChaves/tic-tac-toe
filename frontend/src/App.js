import { useState } from "react";
import { Connect } from "./components/Connect";
import { Lobby } from "./components/Lobby";
import { SocketContext } from "./Context/Socket";

import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

function App() {
  const [room, setRoom] = useState(null);

  return (
    <SocketContext.Provider value={socket}>
      <div>{room ? <Lobby room={room} /> : <Connect setRoom={setRoom} />}</div>
    </SocketContext.Provider>
  );
}

export default App;
