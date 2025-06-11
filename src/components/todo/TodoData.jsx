const TodoData = (props) => {
    const { name, age, data } = props;

    console.log("Check Props: ", props);

    return (
        <div className='todo-data'>
            <div>{name}: Giặt đồ</div>
            <div>{name}: Quét nhà</div>
            <div>
                {JSON.stringify(props.tasks)}
            </div>
        </div>
    );
}

export default TodoData;