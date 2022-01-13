import React from "react";
import style from '../index.module.css';


function Todo(props) {
  return (
    <>
      <li className={style.toggle}>
        <input type="checkbox" id={props.id} defaultChecked={props.completed}/>
        <label htmlFor={props.id}>
          {props.name}
        </label>
        <button className={style.destroy}></button>
      </li>
    </>
  );
}

export default Todo;