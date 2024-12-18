import React, { useState } from 'react';

// Initialize the board with the provided starting values
const InitialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const Sudoku = () => {
  const [board, setBoard] = useState(InitialBoard); // Set the starting board state
  const [validity, setValidity] = useState(Array(9).fill(null).map(() => Array(9).fill(''))); // Track cell validity

  // Function to check if the number is valid in the current cell
  const checkValidity = (row, col, value) => {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === value) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === value) return false;
    }

    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (board[r][c] === value) return false;
      }
    }

    return true;
  };

  // Function to handle input change
  const handleChange = (row, col, e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 9) {
      const newBoard = [...board];
      newBoard[row][col] = value;
      setBoard(newBoard);

      const newValidity = [...validity];
      newValidity[row][col] = checkValidity(row, col, value) ? 'valid' : 'invalid';
      setValidity(newValidity);
    } else {
      const newBoard = [...board];
      newBoard[row][col] = 0;
      setBoard(newBoard);

      const newValidity = [...validity];
      newValidity[row][col] = '';
      setValidity(newValidity);
    }
  };

  // Render the Sudoku grid
  return (
    <div className="sudoku-grid">
      {board.map((row, rowIndex) => (
        <div className="sudoku-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e)}
              style={{
                width: '30px',
                height: '30px',
                margin: '2px',
                textAlign: 'center',
                backgroundColor:
                  validity[rowIndex][colIndex] === 'valid'
                    ? 'green'
                    : validity[rowIndex][colIndex] === 'invalid'
                    ? 'red'
                    : '',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sudoku;
