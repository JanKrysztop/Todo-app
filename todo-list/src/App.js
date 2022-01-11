import  style  from './index.module.css';
import Chevron from './icons/Chevron.png';

function App() {
  return (
    <>
      <h1>todos</h1>
      <div className={style.todo}>
        <header className={style.header}>
          <button>
            <img src={Chevron}/>
          </button>
          <input className={style.input}  name="name" placeholder="What needs to be done?" />
        </header>
        <section className={style.section}>
          <ul className={style.list}>
            <li>
                <input type="checkbox" />
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
