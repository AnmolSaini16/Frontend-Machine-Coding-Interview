import { useState } from "react";
import { clsx } from "../utils";

import "./styles.css";

const BOARD_LENGTH = 9;

const CELLS_IN_LINE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const detemineWinner = (board) => {
  for (let i = 0; i < CELLS_IN_LINE.length; i++) {
    const [x, y, z] = CELLS_IN_LINE[i];
    if (board[x] !== null && board[x] === board[y] && board[y] === board[z]) {
      return board[x];
    }
  }
  return null;
};

export default function TictacToe() {
  const [board, setBoard] = useState(Array(BOARD_LENGTH).fill(null));
  const [isXPlaying, setIsXPlaying] = useState(true);

  const winner = detemineWinner(board);

  const handleCellClick = (index, turn) => {
    const newBaord = board.slice();
    newBaord[index] = turn;
    setBoard(newBaord);
    setIsXPlaying(!isXPlaying);
  };

  const onReset = () => {
    setBoard(Array(BOARD_LENGTH).fill(null));
    setIsXPlaying(true);
  };

  const getStatusMessage = () => {
    if (winner) {
      return `Player ${winner} wins!`;
    }

    if (!board.includes(null)) {
      return "It's a draw!";
    }

    return `${isXPlaying ? "X" : "O"} turn`;
  };

  return (
    <div className="board-container">
      <p
        aria-live="polite"
        className={clsx([winner && "winner", !board.includes(null) && "draw"])}
      >
        {getStatusMessage()}
      </p>
      <div className="board">
        {board.map((val, cellIndex) => {
          const turn = isXPlaying ? "X" : "O";
          return (
            <Cell
              turn={turn}
              disabled={val !== null || winner !== null}
              onClick={() => handleCellClick(cellIndex, turn)}
              index={cellIndex}
              value={val}
              key={cellIndex}
            />
          );
        })}
      </div>
      <button disabled={board.every((cell) => cell == null)} onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

function Cell({ value, disabled, onClick, index, turn }) {
  return (
    <button
      aria-label={value === null ? `Mark cell ${index} as ${turn}` : undefined}
      className="board_cell"
      onClick={onClick}
      disabled={disabled}
    >
      <span aria-hidden={true}>{value}</span>
    </button>
  );
}
