import React, { useState, useEffect } from "react";
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

  // useEffect(() => {
  //   fetch("http://localhost:8000/tasks"
  //     // headers: {
  //     //   "Accept": "application/json",
  //     //   "Content-Type": "application/json",
  //     // },
  //     // method: 'PATCH',
  //     // body: JSON.stringify({tasks: tasks})
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setTasks(data);
  //     });
  // }, []);

  useEffect(() => {
    if (tasks.length) {
      fetch("http://localhost:8000/tasks/1", {
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(tasks),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTasks(data);
        });
    }
  }, [tasks]);

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

  function toggleAllCompleted() {
    const shouldComplete = tasks.some((task) => {
      return !task.completed;
    });
    const updateAll = tasks.map((task) => {
      return { ...task, completed: shouldComplete };
    });
    setTasks(updateAll);
    console.log(tasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function clearCompleted() {
    setTasks((tasks) => {
      return tasks.filter((task) => {
        return !task.completed;
      });
    });
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
