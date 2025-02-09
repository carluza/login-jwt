import { useState } from "react";
import "./App.css";

export function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState("");
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  function checkWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6], // Diagonales
    ];

    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (
        squares[a] !== "" &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // Retorna "X" o "O"
      }
    }
    return "";
  }

  function handleClick(index) {
    if (board[index] !== "" || winner !== "") {
      return;
    }

    let newBoard = [...board];
    if (isXNext) {
      newBoard[index] = "X";
    } else {
      newBoard[index] = "O";
    }

    setBoard(newBoard);
    setIsXNext(!isXNext);

    let gameWinner = checkWinner(newBoard);
    if (gameWinner !== "") {
      setWinner(gameWinner);
    }
  }

  function resetGame() {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setIsXNext(true);
    setWinner("");
  }

  function startGame() {
    if (playerX.trim() !== "" && playerO.trim() !== "") {
      setGameStarted(true);
    }
  }

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>

      {!gameStarted ? (
        <div>
          <input
            type="text"
            placeholder="Nombre Jugador X"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre Jugador O"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
          />
          <button onClick={startGame}>Comenzar</button>
        </div>
      ) : (
        <div>
          <div className="board">
            <button className="square" onClick={() => handleClick(0)}>
              {board[0]}
            </button>
            <button className="square" onClick={() => handleClick(1)}>
              {board[1]}
            </button>
            <button className="square" onClick={() => handleClick(2)}>
              {board[2]}
            </button>
            <button className="square" onClick={() => handleClick(3)}>
              {board[3]}
            </button>
            <button className="square" onClick={() => handleClick(4)}>
              {board[4]}
            </button>
            <button className="square" onClick={() => handleClick(5)}>
              {board[5]}
            </button>
            <button className="square" onClick={() => handleClick(6)}>
              {board[6]}
            </button>
            <button className="square" onClick={() => handleClick(7)}>
              {board[7]}
            </button>
            <button className="square" onClick={() => handleClick(8)}>
              {board[8]}
            </button>
          </div>

          {winner === "" && (
            <h2>
              Turno de: {isXNext ? playerX : playerO} ({isXNext ? "X" : "O"})
            </h2>
          )}

          {winner !== "" && (
            <h2>Ganador: {winner === "X" ? playerX : playerO}</h2>
          )}

          <button className="reset" onClick={resetGame}>
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
}
