import { Button, Input, Form } from "antd";

const RegisterPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("values: ", values);
    }

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            // onFinishFailed={onFinishFailed}"
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
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
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