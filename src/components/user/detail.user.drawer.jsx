import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { updateUserAPI, uploadFileAPI } from '../../services/api.service';

const DetailUserDrawer = (props) => {
    const {
        isDetailOpen, setIsDetailOpen,
        dataDetail, setDataDetail,
        loadUser
    } = props;

    const closeUserForm = () => {
        setDataDetail(null);
        setIsDetailOpen(false);
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

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

    const handleCancelUpdateAvatar = () => {
        setSelectedFile(null);
        setPreview(null);
    }

    const handleSaveUpdateAvatar = async () => {
        console.log("Save hit");

        const responseUpload = await uploadFileAPI(selectedFile, "avatar");

        if (responseUpload.data) {
            const newAvatar = responseUpload.data.fileUploaded;

            const responseUpdate = await updateUserAPI(dataDetail._id, dataDetail.fullName, dataDetail.phone, newAvatar);

            if (responseUpdate.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Update Avatar",
                    description: "Update Avatar successfully!"
                })
            }

            else {
                notification.error({
                    message: "Error When Update Avatar",
                    description: JSON.stringify(responseUpdate.message)
                })
            }
        } else
            notification.error({
                message: "Error When Update Avatar",
                description: JSON.stringify(responseUpload.message)
            })
    }

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
                            marginTop: 15,
                            height: 100,
                            width: 150,
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                                alt="user-avatar" />
                        </div>

                        <div style={{ marginTop: 15 }}>
                            <label htmlFor="btnUpload" style={{ display: "inline-block" }}>
                                Upload Avatar
                            </label>
                            <input type="file" id="btnUpload" hidden onChange={(e) => handleOnChangeFile(e)} />
                        </div>

                        {preview &&
                            <>
                                <div style={{
                                    marginTop: 15,
                                    height: 100,
                                    width: 150,
                                }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview}
                                        alt="user-avatar" />
                                </div>

                                <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
                                    <Button danger type='primary'
                                        onClick={() => handleCancelUpdateAvatar()}>
                                        Cancel
                                    </Button>
                                    <Button type='primary'
                                        onClick={handleSaveUpdateAvatar}>
                                        Save
                                    </Button>
                                </div>
                            </>
                        }

                    </>
                    : <p>There is no data for this user!</p>
                }

            </Drawer>
        </>
    );
}

export default DetailUserDrawer;