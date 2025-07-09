import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const DetailBookDrawer = (props) => {
    const {
        isDetailOpen, setIsDetailOpen,
        dataDetail, setDataDetail,
        loadBook
    } = props;

    const [preview, setPreview] = useState(null);

    const closeBookForm = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    };

    const handleOnChangeFile = () => {

    }

    const handleCancelUpdateCover = () => {
        console.log("Cancel update preview");
    }

    const handleSaveUpdateCover = () => {
        console.log("Save update preview");
    }

    return (
        <>
            <Drawer
                width={'40vw'}
                closable
                destroyOnHidden
                title={<p>Users Detail</p>}
                placement="right"
                onClose={closeBookForm}
                open={isDetailOpen}
            >
                {dataDetail ?
                    <>
                        <p><strong>ID:</strong> {dataDetail._id}</p>
                        <br />
                        <p><strong>Title:</strong> {dataDetail.mainText}</p>
                        <br />
                        <p><strong>Author:</strong> {dataDetail.author}</p>
                        <br />
                        <p><strong>Category:</strong> {dataDetail.category}</p>
                        <br />
                        <p><strong>Price:</strong> {new Intl.NumberFormat('vi-VN', {
                            style: 'currency', currency: 'VND'
                        }).format(dataDetail.price)}
                        </p>
                        <br />
                        <strong>Book Cover:</strong>
                        <div style={{
                            marginTop: 15,
                            height: 100,
                            width: 150,
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}
                                alt="user-avatar" />
                        </div>

                        <div style={{ marginTop: 15 }}>
                            <label htmlFor="btnUpload" style={{ display: "inline-block" }}>
                                Upload cover
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
                                        alt="book-cover" />
                                </div>

                                <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
                                    <Button danger type='primary'
                                        onClick={() => handleCancelUpdateCover()}>
                                        Cancel
                                    </Button>
                                    <Button type='primary'
                                        onClick={handleSaveUpdateCover}>
                                        Save
                                    </Button>
                                </div>
                            </>
                        }

                    </>
                    : <p>There is no data for this book!</p>
                }
            </Drawer>
        </>
    );
};
export default DetailBookDrawer;