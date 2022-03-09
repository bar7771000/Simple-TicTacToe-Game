import React from "react";
import ReactDOM from "react-dom";
import TicTacToe from "./TicTacToe.js";
//import "./index.css";
//import "./styles.css";

function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
