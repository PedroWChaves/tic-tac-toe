import { useState } from "react";
import { Connect } from "./components/Connect";
import { Lobby } from "./components/Lobby";

function App() {
  const [room, setRoom] = useState(null);

  return (
    <div>{room ? <Lobby room={room} /> : <Connect setRoom={setRoom} />}</div>
  );
}

export default App;
