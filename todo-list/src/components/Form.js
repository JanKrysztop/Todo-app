import React, { useState } from "react";
import style from "../index.module.css";
import Chevron from "../icons/Chevron.png";

function Form(props) {
  const [name, setName] = useState('');


  function handleChange(e) {
    const empty = e.target.value.trim();
    console.log(empty)
    if(empty !== ""){
      setName(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("")
  }

  return (
    <form className={style.header} onSubmit={handleSubmit}>
       <button>
        <img src={Chevron} alt="chevron" />
      </button> 
      <input
        type="text"
        className={style.input}
        name="text"
        autoComplete="off"
        placeholder="What needs to be done?"
        value={name}
        onChange={handleChange}
      />
    </form>
  );
}

export default Form;
