import './style.css';

const MyComponent = () => {
    const bfName = "Minh1";
    const gfName = "Tien1";

    const famMem = ["Minh", "Duong", "Hai", "Lan"];

    const person = {
        name: "Minh",
        age: 21
    }

    return (
        <>
            <div>
                {bfName} & {gfName} Update
            </div>
            <div className="child"
                style={
                    {
                        borderRadius: "10px",
                    }
                }>
                {JSON.stringify(famMem)}
            </div>
        </>
    );
}

export default MyComponent;
