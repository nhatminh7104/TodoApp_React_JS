import './components/todo/todo.css';
import TodoNew from './components/todo/TodoInput';
import TodoData from './components/todo/TodoData';
import ReactLogo from './assets/react.svg';

const App = () => {
  return (
    <div className="todo-container">
      <div className='todo-image'>
        <img className='todo-logo' src={ReactLogo} alt="logo" />
      </div>

      <div className="todo-title"> To-do List </div>

      <TodoNew />
      <TodoData />
    </div>
  );
}

export default App;