import { useEffect, useState } from "react";
import { Input, notification, Modal } from "antd";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const {
        isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, setDataUpdate,
        loadUser
    } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const closeUserForm = () => {
        setId("");
        setFullName("");
        setPhone("");
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
    }

    const handleOkBtn = async () => {
        const response = await updateUserAPI(id, fullName, phone);

        if (response.data) {
            notification.success({
                message: "Update user",
                description: "Update user successfully!"
            })
            closeUserForm();
            await loadUser();
        }

        else
            notification.error({
                message: "Error create user",
                description: response.message.join('\n')
            })
    }

    console.log("Check dataUpdate props: ", dataUpdate);

    return (
        <Modal title="Update user"
            open={isModalUpdateOpen}
            onOk={handleOkBtn}
            onCancel={() => closeUserForm()}
            maskClosable={false}
            okText="Save">

            <div className="form-item">
                <label>Id</label>
                <Input value={id} disabled />
            </div>

            <div className="form-item">
                <label>Fullname</label>
                <Input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)} />
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
