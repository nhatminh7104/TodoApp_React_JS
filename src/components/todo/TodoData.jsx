const TodoData = (props) => {
    const { tasks, deleteTask } = props;

    return (
        <div className='todo-data'>
            {
                tasks.map(task => {
                    return (
                        <div key={task.id} className="todo-task">
                            <div>{task.name}</div>
                            <button onClick={() => deleteTask(task.id)}>
                                Delete
                            </button>
                        </div>
                    )
                })
            }
            {tasks.length === 0 && <h3>Chưa có task nào!</h3>}
        </div>
    );
}

export default TodoData;