import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import Log from "./assets/components/Log";
import { useState } from "react";

function deriveActivePlayer(gameTurns) {
  let currrentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currrentPlayer = "O";
  }

  return currrentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelectSquare={selectSquareHandler} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
