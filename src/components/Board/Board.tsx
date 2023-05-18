// Board.tsx

import React, { useState, useEffect } from 'react';
import Square from '../Square';
import './Board.css';


// interface BoardProps {
//   numRows: number;
//   numCols: number;
// }

// const Board: React.FC<BoardProps> = ({ numRows, numCols }) => {
//   const [Board, setBoard] = useState<Array<Array<string | null>>>([]);
//   const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');
//   const [winner, setWinner] = useState<string | null>(null);
  

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
  const numRows = 6;
  const numCols = 7;

  const [Board, setBoard] = useState<Array<Array<string | null>>>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'yellow'>('red');
  const [winner, setWinner] = useState<string | null>(null);
//garantisce che initializeBoard venga chiamato solo una volta,
// all'inizio del rendering del componente.
  useEffect(() => {
    initializeBoard();
  }, []);

  
//viene reimpostata con una matrice vuota e il vincitore viene azzerato
  const initializeBoard = () => {
    const initialBoard = Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill(null));
    setBoard(initialBoard);
    setWinner(null);
  };

  
  

  const handleClick = (colIndex: number) => {
    if (winner) {
      return; // Il gioco è terminato
    }


    //gestisce il click su una colonna della board di gioco, 
    //inserendo il simbolo del giocatore corrente nella cella vuota 
    //corrispondente e verificando se c'è un vincitore.

    const rowIndex = getEmptyRowIndex(colIndex);
    if (rowIndex !== -1) {
      const newBoard = [...Board];
      newBoard[rowIndex][colIndex] = currentPlayer;
      setBoard(newBoard);
      checkWinner(rowIndex, colIndex);
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  //attraversa tutte le righe di una colonna specifica nella board di
  // gioco e restituisce l'indice della prima cella vuota trovata. 
  //Questo indice viene utilizzato successivamente per inserire il 
  //simbolo del giocatore corrente nella colonna corretta durante il 
  //click.
  const getEmptyRowIndex = (colIndex: number): number => {
    for (let row = 0; row < numRows; row++) {
      if (Board[row][colIndex] === null) {
        return row;
      }
    }
    return -1;
  };


  

  const checkWinner = (rowIndex: number, colIndex: number) => {
    const currentPlayerSymbol = currentPlayer === 'red' ? 'red' : 'yellow';
  
    const directions = [
      [0, 1], // Destra
      [1, 0], // Giù
      [1, 1], // Diagonale destra-basso
      [1, -1], // Diagonale sinistra-basso
    ];
  
    for (const [dRow, dCol] of directions) {
      let count = 1;
      let row = rowIndex + dRow;
      let col = colIndex + dCol;
  
      while (isValidCell(row, col) && Board[row][col] === currentPlayerSymbol) {
        count++;
        row += dRow;
        col += dCol;
      }
  
      row = rowIndex - dRow;
      col = colIndex - dCol;
  
      while (isValidCell(row, col) && Board[row][col] === currentPlayerSymbol) {
        count++;
        row -= dRow;
        col -= dCol;
      }
  
      if (count >= 4) {
        setWinner(currentPlayerSymbol);
        break;
      }
    }
  };
  
  const isValidCell = (row: number, col: number): boolean =>
    row >= 0 && row < numRows && col >= 0 && col < numCols;
  
  const renderBoard = () => {

        return Board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((value, colIndex) => (
                <Square
                  key={`${rowIndex}-${colIndex}`}
                  value={value}
                  onClick={() => handleClick(colIndex)}
                />
              ))}
            </div>
        ))
      };

     


      return (
        <div className="Board">

          {renderBoard()}
         
         <div style={{display: 'flex',alignItems:'center'}}>
         Turno Giocatore : <p className="current-player-dot" style={{ backgroundColor: currentPlayer }}></p></div>
          {winner && (
            <div
            className='winner'
            style={{color:winner, backgroundColor: winner === 'red' ? 'yellow' : 'red' }}
            >
              Il giocatore {winner} ha vinto!
            </div>
          )}
      <button className='reset-button'onClick={initializeBoard}>
        Reset
      </button>          

        </div>

      );
    };
    
    export default Board;
    
