import { Button, Drawer } from 'antd';

const DetailUserDrawer = (props) => {
    const {
        isDetailOpen, setIsDetailOpen,
        dataDetail, setDataDetail
    } = props;

    const closeUserForm = () => {
        setDataDetail(null);
        setIsDetailOpen(false);
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
                        <div>
                            <img height={125} width={180} style={{ marginTop: 15 }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                                alt="user-avatar" />
                        </div>
                        <div>
                            <label htmlFor="btnUpload" style={{ display: "inline-block" }}>
                                Upload Avatar
                            </label>
                            <input type="file" id="btnUpload" hidden />
                        </div>
                    </>
                    : <p>There is no data for this user!</p>
                }

            </Drawer>
        </>
    );
}

export default DetailUserDrawer;