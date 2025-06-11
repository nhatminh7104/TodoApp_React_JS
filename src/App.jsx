import './components/todo/todo.css';
import TodoNew from './components/todo/TodoInput';
import TodoData from './components/todo/TodoData';
import ReactLogo from './assets/react.svg';
import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Rua chen" },
    { id: 2, name: "Quet nha" }
  ]);

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
      <TodoData name={name} age={age} data={data} tasks={tasks} />
    </div>
  );
}

export default App;