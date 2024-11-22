import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../Context/Socket";

const jogoInicial = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const Tabuleiro = ({ jogo, joga, jogando }) => {
  return (
    <div className="tabu">
      {jogo.map((fileira, i) => (
        <div>
          {fileira.map((casa, j) => (
            <button
              className={`casa ${casa === "X" ? "cross" : "circle"}`}
              onClick={(e) => joga(i, j)}
              disabled={!jogando || casa !== ""}
            >
              {casa}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Tictactoe = () => {
  const [jogo, setJogo] = useState(structuredClone(jogoInicial));
  const [simbolo, setSimbolo] = useState(null);
  const [jogando, setJogando] = useState(false);
  const [title, setTitle] = useState("Jogo da Velha");
  const [status, setStatus] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("start-game");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("init", (data) => {
      setStatus("");
      setSimbolo(data.simbolo);
      setJogando(data.jogando);
      setJogo(structuredClone(jogoInicial));
      setTitle("Jogo da Velha");
    });

    socket.on("move", (data) => {
      setJogo(data.jogo);
      if (data.status === "") setJogando(true);
      else {
        setJogando(false);
        setTitle(
          data.status === "-" ? "Empate!" : `Parabéns: ${data.status} ganhou!`
        );
      }
      setStatus(data.status);
    });
  }, [socket]);

  const verificaVitoria = (jogo) => {
    //linhas
    let pontos = 0;
    let vitoria = false;
    for (let l = 0; l < 3; l++) {
      pontos = 0;
      for (let c = 0; c < 3; c++) {
        if (jogo[l][c] === simbolo) {
          pontos++;
        }
      }
      if (pontos === 3) {
        vitoria = true;
        break;
      }
    }
    //colunas
    for (let c = 0; c < 3; c++) {
      pontos = 0;
      for (let l = 0; l < 3; l++) {
        if (jogo[l][c] === simbolo) {
          pontos++;
        }
      }
      if (pontos === 3) {
        vitoria = true;
        break;
      }
    }
    //diagonais
    pontos = 0;
    for (let d = 0; d < 3; d++) {
      if (jogo[d][d]) {
        if (jogo[d][d] === simbolo) {
          pontos++;
        }
      }
    }
    if (pontos === 3) {
      vitoria = true;
    }
    pontos = 0;
    let l = 0;
    for (let c = 2; c >= 0; c--) {
      if (jogo[l][c] === simbolo) {
        pontos++;
      }
      l++;
    }
    if (pontos === 3) {
      vitoria = true;
    }
    return vitoria;
  };

  const verificaEmpate = (jogo) => {
    return jogo.every((linha) => linha.every((casa) => casa !== ""));
  };

  const joga = (i, j) => {
    const jogoClone = structuredClone(jogo);
    jogoClone[i][j] = simbolo;
    setJogo(jogoClone);

    let status = "";

    if (verificaVitoria(jogoClone)) {
      setJogando(false);
      setTitle(`Parabéns: ${simbolo} ganhou!`);
      status = simbolo;
    } else if (verificaEmpate(jogoClone)) {
      setJogando(false);
      setTitle("Empate!");
      status = "-";
    }

    setStatus(status);
    socket.emit("move", { jogo: jogoClone, status });
    setJogando(false);
  };

  const reiniciar = () => {
    socket.emit("start-game");
  };

  return (
    <div className="container">
      <h1 className="titulo">{title}</h1>
      <Tabuleiro jogo={jogo} joga={joga} jogando={jogando} />
      {status !== "" && (
        <button className="buttonReset" onClick={() => reiniciar()}>
          Jogar novamente
        </button>
      )}
    </div>
  );
};
