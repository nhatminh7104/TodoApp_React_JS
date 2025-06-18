import { useEffect, useState } from 'react';
import { Drawer } from 'antd';

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
                closable
                destroyOnHidden
                title={<p>User's Detail</p>}
                placement="right"
                open={isDetailOpen}
                onClose={closeUserForm}>


                {dataDetail ?
                    <>
                        <p>ID: {dataDetail._id}</p>
                        <p>Full name: {dataDetail.fullName}</p>
                        <p>Email: {dataDetail.email}</p>
                        <p>Phone: {dataDetail.phone}</p>
                    </>
                    : <p>There is no data for this user!</p>
                }

            </Drawer>
        </>
    );
}

export default DetailUserDrawer;