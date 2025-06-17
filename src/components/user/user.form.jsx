import { Input, notification, Modal } from "antd";
import './user.css';
import { useState } from "react";
import { Button } from 'antd'
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModelOpen] = useState(false);

    const handleOkBtn = async () => {
        const response = await createUserAPI(fullName, email, password, phone);

        if (response.data) {
            notification.success({
                message: "Create user",
                description: "Create user successfully!"
            })
            setIsModelOpen(false);
        }

        else
            notification.error({
                message: "Error create user",
                description: response.message.join('\n')
            })
    }

    return (
        <div className="user-form">
            <div className="user-table-header">
                <h1>User Table</h1>
                <Button size="large"
                    type="primary"
                    onClick={() => setIsModelOpen(true)}>
                    Create New User
                </Button>
            </div>

            <Modal title="Create new user"
                open={isModalOpen}
                onOk={handleOkBtn}
                onCancel={() => setIsModelOpen(false)}
                maskClosable={false}
                okText="Create">

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

            </Modal>
        </div>
    );
}

export default UserForm;