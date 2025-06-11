const TodoInput = (props) => {
    const { addNewTodo } = props;

    // addNewTodo("Minh");

    const handleClick = () => {
        alert("Click me");
    }

    const handleOnChange = (name) => {
        console.log("OnChange: ", name);
    }

    return (
        <div className='todo-input'>
            <input type="text" onChange={(event) => handleOnChange(event.target.value)} />
            <button
                onClick={handleClick}>
                Add
            </button>
        </div>
    );
}

export default TodoInput;