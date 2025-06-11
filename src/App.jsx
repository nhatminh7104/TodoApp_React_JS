import './components/todo/todo.css';
import TodoNew from './components/todo/TodoInput';
import TodoData from './components/todo/TodoData';
import ReactLogo from './assets/react.svg';

const App = () => {

  const name = "Minh";
  const age = 21;
  const data = {
    address: "Saigon",
    country: "Vietnam"
  }

  const addNewTodo = (name) => {
    alert(`Add New Todo! ${name}`);
  }

  return (
    <div className="todo-container">
      <div className='todo-image'>
        <img className='todo-logo' src={ReactLogo} alt="logo" />
      </div>

      <div className="todo-title"> To-do List </div>
      <TodoNew addNewTodo={addNewTodo} />
      <TodoData name={name} age={age} data={data} />
    </div>
  );
}

export default App;