import { useState } from "react";

const TodoInput = (props) => {
    const [valueInput, setValueInput] = useState("Minh");

    const { addNewTodo } = props;

    // addNewTodo("Minh");
    const handleClick = () => {
        console.log("Check ValueInput:", valueInput);
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