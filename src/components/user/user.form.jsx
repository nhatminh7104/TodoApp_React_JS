import { Input } from "antd";
import { Button } from 'antd'
import './user.css';

const UserForm = () => {
    return (
        <div className="user-form">
            <div className="form-grid">
                <div className="form-item">
                    <label>Fullname</label>
                    <Input />
                </div>
                <div className="form-item">
                    <label>Email</label>
                    <Input />
                </div>
                <div className="form-item">
                    <label>Password</label>
                    <Input.Password />
                </div>
                <div className="form-item">
                    <label>Phone Number</label>
                    <Input />
                </div>
                <div>
                    <Button type="primary">
                        Create User
                    </Button>
                </div>
            </div>
        </div>

    );
}

export default UserForm;