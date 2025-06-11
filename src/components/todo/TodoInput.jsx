import { useState } from "react";

const TodoInput = (props) => {
    const [valueInput, setValueInput] = useState("Minh");

    const { addNewTask } = props;

    // addNewTodo("Minh");
    const handleClick = () => {
        addNewTask(valueInput);
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className='todo-input'>
            <input type="text" onChange={(event) => handleOnChange(event.target.value)} />

            <button
                onClick={handleClick}>
                Add
            </button>

            <div>
                Text Input: {valueInput}
            </div>
        </div>
    );
}

export default TodoInput;