import style from "./index.module.css";
import Todo from "./components/Todo.js";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Counter from "./components/Counter";


function App(props) {
  const taskList = props.tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
    />
  ));

  return (
    <>
      <h1>todos</h1>
      <div className={style.todo}>
        <Form />

        <ul className={style.list}>{taskList}</ul>

        <footer className={style.footer}>
          <Counter />
          <FilterButton />
        </footer>
      </div>
    </>
  );
}

export default App;
