import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const DATA = [
  { name: "ONE", id: "todo-0", completed: false },
  { name: "Sleep", id: "todo-1", completed: false },
  { name: "PLEASE", id: "todo-2", completed: true },
];

ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));
