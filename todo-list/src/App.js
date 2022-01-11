import  style  from './index.module.css';


function App() {
  return (
    <>
      <div className={style.todo}>
        <header className={style.header}>
          <h1>todos</h1>
          <input type="checkbox" />
          <input className={style.input}  name="name" placeholder="What needs to be done?" />
        </header>
        <section className={style.section}>
          <ul>
            <li className={style.list}>
                <input type={style.checkbox}/>
                <label>fffff</label>
                <button className={style.destroy}></button>
            </li>
          </ul>
        </section>
        <footer className={style.footer}>
          <p className={style.todoCount}><span>0</span> items left</p>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </footer>
      </div>
    </>
  );
}

export default App;
