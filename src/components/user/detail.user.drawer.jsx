import { Button, Drawer } from 'antd';
import { useState } from 'react';

const DetailUserDrawer = (props) => {
    const {
        isDetailOpen, setIsDetailOpen,
        dataDetail, setDataDetail
    } = props;

    const closeUserForm = () => {
        setDataDetail(null);
        setIsDetailOpen(false);
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
        console.log("User file preview: ", preview);
    }

    console.log("User file preview: ", preview);

    return (
        <>
            <Drawer
                width={'40vw'}
                closable
                destroyOnHidden
                title={<p>Users Detail</p>}
                placement="right"
                open={isDetailOpen}
                onClose={closeUserForm}>

                {dataDetail ?
                    <>
                        <p><strong>ID:</strong> {dataDetail._id}</p>
                        <br />
                        <p><strong>Full name:</strong> {dataDetail.fullName}</p>
                        <br />
                        <p><strong>Email:</strong> {dataDetail.email}</p>
                        <br />
                        <p><strong>Phone:</strong> {dataDetail.phone}</p>
                        <br />
                        <strong>Avatar:</strong>
                        <div style={{
                            marginTop: 10,
                            height: 100,
                            width: 150,
                        }}>
                            <img style={{ marginTop: 15, height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                                alt="user-avatar" />
                        </div>

                        <div style={{ marginTop: 35 }}>
                            <label htmlFor="btnUpload" style={{ display: "inline-block" }}>
                                Upload Avatar
                            </label>
                            <input type="file" id="btnUpload" hidden onChange={(e) => handleOnChangeFile(e)} />
                        </div>

                        {preview &&
                            <div style={{
                                marginTop: 10,
                                height: 100,
                                width: 150,
                            }}>
                                <img style={{ marginTop: 15, height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview}
                                    alt="user-avatar" />
                            </div>
                        }

                    </>
                    : <p>There is no data for this user!</p>
                }

            </Drawer>
        </>
    );
}

export default DetailUserDrawer;