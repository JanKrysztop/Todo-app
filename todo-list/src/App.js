import React, { useState, useEffect, useCallback } from "react";
import style from "./index.module.css";
import Todo from "./components/Todo.js";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const patchTask = (task) => {
  return fetch(`http://localhost:8000/tasks/${task.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(task),
  }).then((res) => {
    return res.json();
  });
};

const postTask = (task) => {
  return fetch("http://localhost:8000/tasks", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(task),
  }).then((res) => {
    return res.json();
  });
};

const removeTask = (id) => {
  return fetch(`http://localhost:8000/tasks/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  }).then((res) => {
    return res.json();
  });
};

function App() {
  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem("filter");
    if (savedFilter) {
      return JSON.parse(savedFilter);
    } else {
      return "All";
    }
  });

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filter));
  }, [filter]);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  // useCallback to make sure that this function is THE SAME function on each render
  const syncTasks = useCallback(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => {
        return res.json();
      })
      .then(setTasks);
  }, []);

  useEffect(() => {
    syncTasks();
  }, []);

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    // setTasks([...tasks, newTask]);
    postTask(newTask).then(syncTasks);
  }

  function toggleTaskCompleted(id) {
    const task = tasks.find((task) => task.id === id);

    patchTask({
      ...task,
      completed: !task.completed,
    }).then(syncTasks);
  }

  function editTask(id, newName) {
    const task = tasks.find((task) => task.id === id);

    patchTask({
      ...task,
      name: newName,
    }).then(syncTasks);
  }

  function toggleAllCompleted() {
    const shouldComplete = tasks.some((task) => {
      return !task.completed;
    });
    const updateAll = tasks.map((task) => {
      return { ...task, completed: shouldComplete };
    });
    setTasks(updateAll);

    //For each i update dla każdego
  }

  function deleteTask(id) {
    removeTask(id).then(syncTasks);
  }

  function clearCompleted() {
    tasks.forEach((task) => {
      if (task.completed) {
        removeTask(task.id);
      }
    });

    setTasks((tasks) => {
      return tasks.filter((task) => {
        return !task.completed;
      });
    });
  }

  // const taskCompleted = tasks.filter((task) => !task.completed);
  // removeTask(taskCompleted).then(syncTasks);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
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

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const footerCounter = `${taskList.length} ${tasksNoun}`;

  return (
    <>
      <h1>todos</h1>
      <div className={style.todo}>
        <Form
          addTask={addTask}
          toggleAllCompleted={toggleAllCompleted}
          taskList={taskList.length}
          filter={filter}
        />

        <ul className={style.list}>{taskList}</ul>

        {taskList.length === 0 && filter === "All" ? null : (
          <footer className={style.footer}>
            <p className={style.todoCount}>{footerCounter} left</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              {filterList}
            </div>
            <button
              className={style.clearButton}
              onClick={clearCompleted}
              style={{ border: "none" }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </>
  );
}

export default App;
