import React from "react";
import style from "../index.module.css";

function Counter (props){
  return (
    <p className={style.todoCount}>
    <span>0</span> items left
  </p>
  );
}

export default Counter;