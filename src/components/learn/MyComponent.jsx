import './style.css';

const MyComponent = () => {
    return (
        <>
            <div>
                Minh & Tien Update
            </div>
            <div className="child"
                style={
                    {
                        borderRadius: "10px",
                    }
                }
            >
                Child Component
            </div>
        </>
    );
}

export default MyComponent;
