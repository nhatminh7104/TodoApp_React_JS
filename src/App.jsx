import './components/todo/todo.css';
import TodoNew from './components/todo/TodoInput';
import TodoData from './components/todo/TodoData';
import ReactLogo from './assets/react.svg';
import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const addNewTask = (name) => {
    const newTask = {
      id: randomIntFromInterval(1, 1000000000),
      name: name
    }
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todo-container">
      <div className='todo-image'>
        <img className='todo-logo' src={ReactLogo} alt="logo" />
      </div>

      <div className="todo-title"> To-do List </div>
      <TodoNew addNewTask={addNewTask} />
      <TodoData tasks={tasks} />
    </div>
  );
}

export default App;