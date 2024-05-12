import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import Log from "./assets/components/Log";
import GameOver from "./assets/components/GameOver";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import { useState } from "react";

function deriveActivePlayer(gameTurns) {
  let currrentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currrentPlayer = "O";
  }

  return currrentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameBoard, players) {
  let winner = undefined;
  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].column];
    const second = gameBoard[combination[1].row][combination[1].column];
    const third = gameBoard[combination[2].row][combination[2].column];

    if (first && first == second && second == third) {
      winner = players[first];
    }
  }

  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState("X");
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  const hasDraw = gameTurns.length == 9 && winner == null;

  function selectSquareHandler(rowIndex, colIndex) {
    //setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
    setGameTurns((prev) => {
      const currrentPlayer = deriveActivePlayer(prev);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currrentPlayer },
        ...prev,
      ];

      return updateTurns;
    });
  }

  const winner = deriveWinner(gameBoard, players);

  function reStartHandler() {
    setGameTurns([]);
  }

  function nameChangeHandler(symbol, newName) {
    setPlayers((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={nameChangeHandler}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={nameChangeHandler}
          />
        </ol>
        {(hasDraw || winner) && (
          <GameOver winner={winner} onRestart={reStartHandler} />
        )}
        <GameBoard onSelectSquare={selectSquareHandler} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
