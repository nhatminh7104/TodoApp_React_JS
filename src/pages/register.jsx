import { Button, Input, Form, notification } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log("values: ", values);

        const response = await registerUserAPI(values.fullName, values.email, values.password, values.phone);

        if (response.data) {
            notification.success({
                message: "Registration",
                description: "Registration successful!"
            })

            navigate("/login");
        }
        else
            notification.error({
                message: "Registration error",
                description: JSON.stringify(response.message)
            })
    }

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
                <div style={{
                    width: "500px",
                    display: "flex",
                    margin: "50px auto",
                    flexDirection: "column",
                }}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{
                            required: true,
                            message: "Full Name is required!"
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Email is required!"
                            },
                            {
                                type: "email",
                                message: "The input is not valid Email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Password is required!"
                            },
                            {
                                min: 5,
                                message: 'Username must be minimum 5 characters.'
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Phone is required!"
                            },
                            {
                                pattern: new RegExp(/\d+/g),
                                message: "Phone must be number!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <div>
                        <Button
                            type="primary"
                            onClick={() => form.submit()}>
                            Register
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
}

export default RegisterPage;