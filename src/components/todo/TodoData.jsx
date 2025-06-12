
const TodoData = (props) => {
    const { tasks } = props;

    return (
        <div className='todo-data'>
            {tasks.map(task => {
                return (
                    <div key={task.id} className="todo-task">
                        <div>{task.name}</div>
                        <button>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default TodoData;