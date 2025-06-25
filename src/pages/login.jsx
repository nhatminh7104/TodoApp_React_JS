import React, { useContext, useState } from 'react';
import { Button, Col, Form, Input, Row, Divider, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { loginUserAPI } from '../services/api.service';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setIsLoading(true);
        const { username, password } = values;

        const response = await loginUserAPI(username, password);

        if (response.data) {
            message.success("Login succeed!");
            localStorage.setItem("access_token", response.data.access_token);
            setUser(response.data.user);
            navigate("/");
        }
        else {
            notification.error({
                message: "Error when login!",
                description: JSON.stringify(response.message)
            })
        }

        setIsLoading(false);
    };

    return (
        <Row justify="center" style={{ marginTop: 100 }}>
            <Col xs={22} sm={16} md={12} lg={8}>
                <fieldset style={{
                    border: '1px solid #d9d9d9',
                    padding: '30px',
                    borderRadius: '8px',
                    position: 'relative',
                }} >
                    <legend style={{
                        fontSize: '18px',
                        padding: '0 10px',
                    }}>
                        Login
                    </legend>

                    <Form
                        layout={'vertical'}
                        form={form}
                        onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="username"
                            rules={[
                                { required: true, message: 'Email is required!' },
                                { type: 'email', message: "The input is not valid!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 5, message: 'Username must be minimum 5 characters.' },
                            ]}
                        >
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === "Enter") form.submit();
                            }} />
                        </Form.Item>

                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <Button type="primary" loading={loading}
                                    onClick={() => form.submit()}>
                                    Login
                                </Button>

                                <a href="/">Go to homepage <ArrowRightOutlined /></a>
                            </div>
                        </Form.Item>
                    </Form>

                    <Divider />

                    <div style={{ textAlign: 'center' }}>
                        Need an account? <Link to={"/register"}>Sign Up</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
}

export default LoginPage;