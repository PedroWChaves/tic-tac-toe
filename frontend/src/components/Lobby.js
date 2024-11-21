import React,{useState, useRef} from 'react'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'

const MAX_NUM_PLAYERS = 2;

export const Lobby = ({ room }) => {
  console.log(room);
  const jogoInicial=[['','',''],['','',''],['','','']]
  const [jogo,setJogo] = useState(jogoInicial)
  const [simboloAtual,setSimboloAtual]=useState('X')
  const [jogando,setJogando] = useState(true)
  let titleRef = useRef(null)

  const tabuleiro=(j)=>{
    return(
      <div>
        <h1 className='titulo' ref={titleRef}> Jogo da velha </h1>
      <div className='tabu'>

        <div>
          <div className='casa' data-pos='00'  onClick={(e)=>joga(e)}>{j[0][0]}</div>
          <div className='casa' data-pos='01'  onClick={(e)=>joga(e)}>{j[0][1]}</div>
          <div className='casa' data-pos='02'  onClick={(e)=>joga(e)}>{j[0][2]}</div>
        </div>
        <div>
          <div className='casa' data-pos='10'  onClick={(e)=>joga(e)}>{j[1][0]}</div>
          <div className='casa' data-pos='11'  onClick={(e)=>joga(e)}>{j[1][1]}</div>
          <div className='casa' data-pos='12'  onClick={(e)=>joga(e)}>{j[1][2]}</div>
        </div>
        <div>
          <div className='casa' data-pos='20'  onClick={(e)=>joga(e)}>{j[2][0]}</div>
          <div className='casa' data-pos='21'  onClick={(e)=>joga(e)}>{j[2][1]}</div>
          <div className='casa' data-pos='22'  onClick={(e)=>joga(e)}>{j[2][2]}</div>
        </div>
      </div>
      </div>
    )
  }
  const BtnJogarNovamente=()=>{
    if(!jogando ){
      return <button className='buttonReset' onClick={()=>reiniciar()}>Jogar novamente</button>
    }if(jogo[0][0]!=='' && jogo[0][1]!=='' && jogo[0][2]!==''&& jogo[1][0]!==''&& jogo[1][1]!==''&& jogo[1][2]!==''&& jogo[2][0]!==''&& jogo[2][1]!==''&& jogo[2][2]!==''){
      return <button className='buttonReset' onClick={()=>reiniciar()}>Jogar novamente</button>
    }
  }
  const verificaVitoria=()=>{
     //linhas
     let pontos=0
     let vitoria=false
     for(let l=0;l<3;l++){
      pontos=0;
      for(let c=0;c<3;c++){
        if(jogo[l][c]===simboloAtual){
          pontos++
        }
      }
      if(pontos === 3){
        vitoria=true
        break
      }
     }
     //colunas
     for(let c=0; c<3;c++){
      pontos=0
      for(let l=0;l<3;l++){
        if(jogo[l][c]===simboloAtual){
          pontos++
        }
      }
      if(pontos === 3){
        vitoria=true
        break
      }
     }
     //diagonais
     pontos=0
     for(let d=0;d<3;d++){
      if(jogo[d][d]){
        if(jogo[d][d]===simboloAtual){
          pontos++
        }
      }
     }
     if(pontos === 3){
      vitoria=true
    }
    pontos =0
    let l=0
    for(let c=2;c>=0;c--){
      if(jogo[l][c]===simboloAtual){
        pontos++
      }
      l++
    }
    if(pontos === 3){
      vitoria=true
    }
    return vitoria
  }

  const trocaJogador=()=>{
    simboloAtual=='X' ? setSimboloAtual('O'):setSimboloAtual('X')
  }

  const retPos=(e)=>{
    const p=e.target.getAttribute('data-pos')
    const pos = [parseInt(p.substring(0, 1)), parseInt(p.substring(1, 2))];
    return pos
  }

  const verificaEspacoVazio=(e)=>{
    if(jogo[retPos(e)[0]][retPos(e)[1]]===''){
      return true
    }else{
      return false
    }
  }

  const joga = (e) => {
    if (jogando) {
      if (verificaEspacoVazio(e)) {
        const pos = retPos(e);
        jogo[pos[0]][pos[1]] = simboloAtual;
        e.target.classList.add(simboloAtual === 'X' ? 'cross' : 'circle');
        trocaJogador();
        if (verificaVitoria()) {
          trocaJogador();
          setJogando(false);
          alert('Jogador ' + simboloAtual + ' venceu!');
        }
      } else {
        alert('Este espaço não está disponível');
      }
    }
  };

  const reiniciar = () => {
    setJogando(true);
    setJogo(jogoInicial);
    setSimboloAtual('X');
    document.querySelectorAll('.casa').forEach((casa) => {
      casa.classList.remove('cross', 'circle');
    });
  };
  

  return (
    <div className='container'>
      <h1 className='texto'>Sala {room.code}</h1>
      {room.players.map((player) => (
        <p className='texto' key={player}>{player}</p>
      ))}
      {room.players.length < MAX_NUM_PLAYERS ? (
        <p className='texto'>Esperando outros jogadores...</p>
      ) : (
        <button>Iniciar jogo</button>
      )}
    <div >
      
     <p>Quem joga: {simboloAtual}</p>
    </div>
    <div>
      {tabuleiro(jogo)}
    </div>
    <div>
      {BtnJogarNovamente()}
    </div>
    </div>
  );


};
