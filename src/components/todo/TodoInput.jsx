import { useState } from "react";

const TodoInput = (props) => {
    const [valueInput, setValueInput] = useState("");

    const { addNewTask } = props;

    const handleClick = () => {
        if (valueInput) {
            addNewTask(valueInput);
            setValueInput("");
        }
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className='todo-input'>
            <input type="text" value={valueInput}
                onChange={(event) => handleOnChange(event.target.value)} />

            <button onClick={handleClick}>
                Add
            </button>
        </div>
    );
}

export default TodoInput;