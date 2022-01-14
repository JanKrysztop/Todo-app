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

  function toggleTaskCompleted(id) {
    const updateTask = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTask);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const footerCounter = `${taskList.length} ${tasksNoun}`;

  return (
    <>
      <h1>todos</h1>
      <div className={style.todo}>
        <Form addTask={addTask} />

        <ul className={style.list}>{taskList}</ul>

        <footer className={style.footer}>
          <p className={style.todoCount}>{footerCounter} left</p>
          <FilterButton />
        </footer>
      </div>
    </>
  );
}

export default App;
