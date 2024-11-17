const MAX_NUM_PLAYERS = 2;

export const Lobby = ({ room }) => {
  console.log(room);
  return (
    <div>
      <h1>Sala {room.code}</h1>
      {room.players.map((player) => (
        <p key={player}>{player}</p>
      ))}
      {room.players.length < MAX_NUM_PLAYERS ? (
        <p>Esperando outros jogadores...</p>
      ) : (
        <button>Iniciar jogo</button>
      )}
    </div>
  );
};
