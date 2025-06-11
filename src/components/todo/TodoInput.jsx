const TodoInput = (props) => {
    const { addNewTodo } = props;

    // addNewTodo("Minh");
    return (
        <div className='todo-input'>
            <input type="text" />
            <button>Add</button>
        </div>
    );
}

export default TodoInput;