import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Upload } from "antd";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";


const CreateBookModal = (props) => {
    const {
        isModalOpen, setIsModalOpen,
        loadBook
    } = props;

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [form] = Form.useForm();
    const [loading, setIsLoading] = useState(false);

    const handleCancel = () => {
        form.resetFields();
        setPreview(null);
        setSelectedFile(null);
        setIsModalOpen(false);
    }

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleOkBtn = async (values) => {
        setIsLoading(true);

        const { title, author, price, quantity, category } = values;

        if (!selectedFile) {
            notification.error({
                message: "Error When Create Book",
                description: "Please select book cover"
            })
            return;
        }

        const responseUpload = await uploadFileAPI(selectedFile, 'book');

        if (responseUpload.data) {
            const newBookCover = responseUpload.data.fileUploaded;

            const responseUpdate = await createBookAPI(title, author, price, quantity, category, newBookCover);

            if (responseUpdate.data) {
                form.resetFields();
                setSelectedFile(null);
                setIsModalOpen(false);
                setPreview(null);
                await loadBook();

                notification.success({
                    message: "Create Book",
                    description: "Create Book successfully!"
                })
            }
            else {
                notification.error({
                    message: "Error When Create Book",
                    description: JSON.stringify(responseUpdate.message)
                })
            }
        }
        else {
            notification.error({
                message: "Error When Create Book",
                description: JSON.stringify(responseUpload.message)
            })
        }
    }

    return (
        <Modal title="Create New Book"
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            maskClosable={false}
            okText={"Create"}
        >
            <Form
                layout={'vertical'}
                form={form}
                onFinish={handleOkBtn}
                initialValues={{ category: '' }}
                style={{ width: "100%" }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        { required: true, message: 'Title is required!' }
                    ]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Author"
                    name="author"
                    rules={[
                        { required: true, message: 'Author is required!' },
                    ]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Price is required!' },
                    ]}
                >
                    <InputNumber addonAfter="đ" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        { required: true, message: 'Quantity is required!' },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        { required: true, message: 'Category is required!' },
                    ]}
                >
                    <Select
                        style={{ width: "100%" }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },
                        ]}
                    />
                </Form.Item>

                <label>Book Cover</label>
                {preview && (
                    <div style={{ marginTop: 15 }}>
                        <img
                            src={preview}
                            alt="book-cover"
                            style={{
                                height: 100, width: 150,
                                objectFit: "contain",
                                marginBottom: 5
                            }}
                        />
                    </div>
                )}

                <div style={{ marginTop: 15 }}>
                    <label htmlFor="btnUpload" style={{ display: "inline-block" }}>
                        {preview ? "Change" : "Upload"}
                    </label>
                    <input type="file" id="btnUpload"
                        onChange={(e) => handleOnChangeFile(e)}
                        onClick={(e) => e.target.value = null}
                        style={{ display: "none" }}
                    />
                </div>

                {/* <Upload
                        beforeUpload={(file) => {
                            setSelectedFile(file);
                            setPreview(URL.createObjectURL(file));
                            return false;
                        }}
                        showUploadList={false}
                    >
                        <Button style={{ backgroundColor: '#13c2c2', color: '#fff' }}>
                            Upload
                        </Button>
                    </Upload> */}
            </Form>
        </Modal>
    );
}

export default CreateBookModal;