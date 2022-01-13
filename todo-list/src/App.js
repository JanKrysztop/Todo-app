import React, { useState } from "react";
import style from "./index.module.css";
import Todo from "./components/Todo.js";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "items" : "item"
  const footerCounter = `${taskList.length} ${tasksNoun}` ;

  return (
    <>
      <h1>todos</h1>
      <div className={style.todo}>
        <Form addTask={addTask} />

        <ul className={style.list}>{taskList}</ul>

        <footer className={style.footer}>
          <p className={style.todoCount}>
            {footerCounter} left
          </p>
          <FilterButton />
        </footer>
      </div>
    </>
  );
}

export default App;
