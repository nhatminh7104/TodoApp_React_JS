import './todo.css';
import TodoNew from './TodoInput';
import TodoData from './TodoData';
import ReactLogo from '../../assets/react.svg';
import { useState } from 'react';

const TodoApp = () => {
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

    const deleteTask = (id) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }

    return (
        <div className="todo-container">
            <div className='todo-image'>
                <img className='todo-logo' src={ReactLogo} alt="logo" />
            </div>
            <div className="todo-title"> To-do List </div>

            <TodoNew addNewTask={addNewTask} />
            <TodoData tasks={tasks} deleteTask={deleteTask} />
        </div>
    );
}

export default TodoApp;