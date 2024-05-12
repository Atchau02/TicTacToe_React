import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import Log from "./assets/components/Log";
import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function selectSquareHandler(rowIndex, colIndex) {
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
    setGameTurns((prev) => {
      let currrentPlayer = "X";

      if (prev.length > 0 && prev[0].player === "X") {
        currrentPlayer = "O";
      }

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
      <Log turn={gameTurns} />
    </main>
  );
}

export default App;
