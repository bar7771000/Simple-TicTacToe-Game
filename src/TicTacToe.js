import React, { memo, useCallback, useReducer } from "react";
import classNames from "classnames";
import "./index.css";

/* TODO - Change this to memo instead of memox and it breaks */
const Square = memo(({ value, onClick, index }) => {
  return (
    <button className="Square" onClick={() => onClick(index)}>
      {value}
    </button>
  );
});

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winner = lines.reduce((memo, [a, b, c]) => {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      memo = squares[a];
    }
    return memo;
  }, "");
  if (!winner && squares.every(s => s)) {
    winner = "tie";
  }
  return winner;
}

function Board({ squares, onClick }) {
  return (
    <div className="Board">
      {squares.map((square, i) => (
        <Square key={i} index={i} value={square} onClick={onClick} />
      ))}
    </div>
  );
}

function Announcement({ winner, onStart }) {
  return (
    <div className="Announcement">
      {winner === "tie" ? (
        <div>Tie Game</div>
      ) : (
        <div>
          <div>Congrats</div>
          <h1>{winner}</h1>
        </div>
      )}
      <button className="Button" onClick={onStart}>
        Start
      </button>
    </div>
  );
}

function Message({ hasStarted, isXNext }) {
  return (
    <div className="Message">
      {hasStarted
        ? isXNext
          ? "It's Xs turn"
          : "It's Os turn"
        : "Click to start game"}
    </div>
  );
}

const defaultState = {
        squares: Array(9).fill(null),
        isXNext: true,
        winner: ""
}

const reducer = (state, action) => {
    switch(action.type){
        case "start":
            return defaultState;
        case "click":
            const moves = [...state.squares];
            moves[action.payload] = state.isXNext ? "X" : "O";
            return{
                squares: moves,
                isXNext: !state.isXNext,
                winner: calculateWinner(moves)
            }
        default:
            return state
    }
}

export default function Game() {
  const [{squares, isXNext, winner}, dispatch] = useReducer(reducer, defaultState);

  
  const handleClick = useCallback(i => {
    dispatch({type:'click', payload: i})
}, [dispatch])


  const handleStart = useCallback(() => {
      dispatch({type : 'start'});
  }, [dispatch])

  return (
    <div className={classNames("Game", { "Game--winner": !!winner })}>
      <Board squares={squares} onClick={handleClick} />
      <Message hasStarted={squares.some(s => s)} isXNext={isXNext} />
      {!!winner && <Announcement winner={winner} onStart={handleStart} />}
    </div>
  );
}
