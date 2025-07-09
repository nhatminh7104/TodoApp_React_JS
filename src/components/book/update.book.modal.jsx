import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { createBookAPI, updateBookAPI, uploadFileAPI } from "../../services/api.service";

const UpdateBookModal = (props) => {
    const {
        loadBook,
        isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, setDataUpdate
    } = props

    // const [id, setId] = useState('')
    // const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    // const [price, setPrice] = useState('');
    // const [quantity, setQuantity] = useState('');
    // const [category, setCategory] = useState('');

    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            // setId(dataUpdate._id);
            // setTitle(dataUpdate.mainText);
            // setAuthor(dataUpdate.author);
            // setPrice(dataUpdate.price);
            // setQuantity(dataUpdate.quantity);
            // setCategory(dataUpdate.category);

            form.setFieldsValue({
                id: dataUpdate._id,
                title: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
            });

            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate])

    const handleOkBtn = async (values) => {
        console.log("Values: ", values);
        const { id, title, author, price, quantity, category } = values

        if (!selectedFile && !preview) {
            notification.error({
                message: "Error When Update Book",
                description: "Please choose a book cover"
            })
            return;
        }

        if (selectedFile) {
            const responseUpload = await uploadFileAPI(selectedFile, 'book');

            if (responseUpload.data) {
                const newBookCover = responseUpload.data.fileUploaded;

                const responseUpdate = await updateBookAPI(id, title, author, price, quantity, category, newBookCover);

                if (responseUpdate.data) {
                    setSelectedFile(null);
                    setIsModalUpdateOpen(false);
                    setDataUpdate(null);
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
        } else {
            const responseUpdate = await updateBookAPI(id, title, author, price, quantity, category);

            if (responseUpdate.data) {
                setSelectedFile(null);
                setIsModalUpdateOpen(false);
                setDataUpdate(null);
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
    }

    const handleCancel = () => {
        form.resetFields();
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
    }

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    }

    return (
        // <Modal title="Update Book"
        //     open={isModalUpdateOpen}
        //     onOk={handleOkBtn}
        //     onCancel={handleCancel}
        //     maskClosable={false}
        //     okText="Update"
        // >
        //     <Input value={id} style={{ display: "none" }} />

        //     <div className="form-item">
        //         <label>Title</label>
        //         <Input
        //             value={title}
        //             onChange={(event) => setTitle(event.target.value)} />
        //     </div>
        //     <div className="form-item">
        //         <label>Author</label>
        //         <Input
        //             value={author}
        //             onChange={(event) => setAuthor(event.target.value)} />
        //     </div>

        //     <div className="form-item">
        //         <label>Price</label>
        //         <InputNumber
        //             value={price} addonAfter="đ"
        //             onChange={(value) => setPrice(value)} />
        //     </div>

        //     <div className="form-item">
        //         <label>Quantity</label>
        //         <InputNumber
        //             value={quantity}
        //             style={{ width: "100%" }}
        //             onChange={(value) => setQuantity(value)} />
        //     </div>

        //     <div className="form-item">
        //         <label>Category</label>

        //         <Select
        //             value={category}
        //             onChange={(value) => setCategory(value)}
        //             options={[
        //                 { value: 'Arts', label: 'Arts' },
        //                 { value: 'Business', label: 'Business' },
        //                 { value: 'Comics', label: 'Comics' },
        //                 { value: 'Cooking', label: 'Cooking' },
        //                 { value: 'Entertainment', label: 'Entertainment' },
        //                 { value: 'History', label: 'History' },
        //                 { value: 'Music', label: 'Music' },
        //                 { value: 'Sports', label: 'Sports' },
        //                 { value: 'Teen', label: 'Teen' },
        //                 { value: 'Travel', label: 'Travel' },
        //             ]}
        //         />
        //     </div>

        //     <div className="form-item">
        //         <label>Book Cover</label>

        //         {preview && (
        //             <div style={{ marginTop: 15 }}>
        //                 <img
        //                     src={preview}
        //                     alt="book-cover"
        //                     style={{ height: 100, width: 150, objectFit: "contain" }}
        //                 />
        //             </div>
        //         )}
        //         <div style={{ marginTop: 15 }}>
        //             <label htmlFor="btnUpload" style={{ display: "inline-block" }}>
        //                 {preview ? "Change" : "Upload"}
        //             </label>
        //             <input type="file" id="btnUpload" hidden
        //                 onChange={handleOnChangeFile}
        //                 onClick={(e) => e.target.value = null}
        //             />
        //         </div>
        //     </div>
        // </Modal>

        <Modal title="Update Book"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            maskClosable={false}
            okText="Update"
        >
            <Form
                layout={'vertical'}
                form={form}
                onFinish={handleOkBtn}
                style={{ width: "100%" }}
            >
                <Form.Item
                    name="id"
                    hidden
                >
                    <Input />
                </Form.Item>

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
            </Form>
        </Modal>
    )
}

export default UpdateBookModal;