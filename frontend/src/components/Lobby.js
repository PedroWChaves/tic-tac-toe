import { Tictactoe } from "./Tictactoe";

const MAX_NUM_PLAYERS = 2;

export const Lobby = ({ room }) => {
  return (
    <div className="container">
      <h1 className="texto">Sala {room.code}</h1>
      {room.players.length < MAX_NUM_PLAYERS ? (
        <>
          <p className="texto">Esperando outro jogador...</p>
          <div class="loader"></div>
        </>
      ) : (
        <></>
      )}
      <Tictactoe />
    </div>
  );
};
