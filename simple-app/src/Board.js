import React from 'react';
import Cell from './Cell';

const Board = ({ board, onCellChange }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;