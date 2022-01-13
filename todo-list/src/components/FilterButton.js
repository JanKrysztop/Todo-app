import React from "react";
import style from "../index.module.css";

function FilterButton(props) {
  return (
    <div className={style.buttons}>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  );
}

export default FilterButton;
