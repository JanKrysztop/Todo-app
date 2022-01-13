import React from "react";
import style from "../index.module.css";
import Chevron from "../icons/Chevron.png";

function Form(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.addTask("helo");
  }

  return (
    <form className={style.header} onSubmit={handleSubmit}>
       <button>
        <img src={Chevron} alt="chevron" />
      </button> 
      <input
        className={style.input}
        name="name"
        placeholder="What needs to be done?"
      />
    </form>
  );
}

export default Form;
