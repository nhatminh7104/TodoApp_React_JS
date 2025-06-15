import { Input, notification } from "antd";
import { Button } from 'antd'
import './user.css';
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleClickBtn = async () => {
        const response = await createUserAPI(fullName, email, password, phone);

        if (response.data)
            notification.success({
                message: "Create user",
                description: "Create user successfully!"
            })
        else
            notification.error({
                message: "Error create user",
                description: JSON.stringify(response.message)
            })
    }

    return (
        <div className="user-form">
            <div className="form-grid">
                <div className="form-item">
                    <label>Fullname</label>
                    <Input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)} />
                </div>
                <div className="form-item">
                    <label>Email</label>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-item">
                    <label>Password</label>
                    <Input.Password
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-item">
                    <label>Phone</label>
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={() => { handleClickBtn() }}>
                        Create User
                    </Button>
                </div>
            </div>
        </div>

    );
}

export default UserForm;