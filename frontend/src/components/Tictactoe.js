import { useState, useContext } from "react";
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
              className="casa"
              data-pos={`${i}${j}`}
              onClick={(e) => joga(e)}
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
  const [simboloAtual, setSimboloAtual] = useState("X");
  const [jogando, setJogando] = useState(true);
  const [title, setTitle] = useState("Jogo da Velha");
  const socket = useContext(SocketContext);

  const verificaVitoria = () => {
    //linhas
    let pontos = 0;
    let vitoria = false;
    for (let l = 0; l < 3; l++) {
      pontos = 0;
      for (let c = 0; c < 3; c++) {
        if (jogo[l][c] === simboloAtual) {
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
        if (jogo[l][c] === simboloAtual) {
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
        if (jogo[d][d] === simboloAtual) {
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
      if (jogo[l][c] === simboloAtual) {
        pontos++;
      }
      l++;
    }
    if (pontos === 3) {
      vitoria = true;
    }
    return vitoria;
  };

  const verificaEmpate = () => {
    return jogo.every((linha) => linha.every((casa) => casa !== ""));
  };

  const trocaJogador = () => {
    simboloAtual === "X" ? setSimboloAtual("O") : setSimboloAtual("X");
  };

  const retPos = (e) => {
    const p = e.target.getAttribute("data-pos");
    const pos = [parseInt(p.substring(0, 1)), parseInt(p.substring(1, 2))];
    return pos;
  };

  const verificaEspacoVazio = (e) => {
    return jogo[retPos(e)[0]][retPos(e)[1]] === "";
  };

  const joga = (e) => {
    if (!verificaEspacoVazio(e)) {
      alert("Este espaço está ocupado!");
      return;
    }

    const pos = retPos(e);
    jogo[pos[0]][pos[1]] = simboloAtual;
    e.target.classList.add(simboloAtual === "X" ? "cross" : "circle");
    trocaJogador();
    if (verificaVitoria()) {
      trocaJogador();
      setJogando(false);
      setTitle(`Parabéns: ${simboloAtual} ganhou!`);
    } else if (verificaEmpate()) {
      setJogando(false);
      setTitle("Empate!");
    }
  };

  const reiniciar = () => {
    setJogo(structuredClone(jogoInicial));
    setJogando(true);
    setSimboloAtual("X");
    setTitle("Jogo da Velha");
    document.querySelectorAll(".casa").forEach((casa) => {
      casa.classList.remove("cross", "circle");
    });
  };

  return (
    <div className="container">
      <h1 className="titulo">{title}</h1>
      <Tabuleiro jogo={jogo} joga={joga} jogando={jogando} />
      {!jogando && (
        <button className="buttonReset" onClick={() => reiniciar()}>
          Jogar novamente
        </button>
      )}
    </div>
  );
};
