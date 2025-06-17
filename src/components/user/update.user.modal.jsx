import { useState } from "react";
import { Input, notification, Modal } from "antd";
import { createUserAPI } from "../../services/api.service";

const UpdateUserModal = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModelOpen] = useState(false);

    const closeUserForm = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsModelOpen(false);
    }

    const handleOkBtn = async () => {
        const response = await createUserAPI(fullName, email, password, phone);

        if (response.data) {
            notification.success({
                message: "Create user",
                description: "Create user successfully!"
            })
            closeUserForm();
            // await loadUser();
        }

        else
            notification.error({
                message: "Error create user",
                description: response.message.join('\n')
            })
    }

    return (
        <Modal title="Update user"
            open={isModalOpen}
            onOk={handleOkBtn}
            onCancel={() => closeUserForm()}
            maskClosable={false}
            okText="Save">

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
    );
}
export default UpdateUserModal;
