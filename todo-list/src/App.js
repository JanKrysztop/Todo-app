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
            <li className={style.toggle}>
                <input type='checkbox' id='thing'/>
                <label for='thing'>AAAA</label>
                <button className={style.destroy}></button>
            </li>
          </ul>
        </section>
        <footer className={style.footer}>
          <p className={style.todoCount}><span>0</span> items left</p>
          <div className={style.buttons}>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
