import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import DetailUserDrawer from './detail.user.drawer';

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a onClick={() => {
                        setIsDetailOpen(true);
                        setDataDetail(record)
                    }}>
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            width: 220,
            render: (_, record) => (
                <>
                    <button className='edit-btn'
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}>
                        <EditOutlined /> Edit
                    </button>
                    <button className='delete-btn'>
                        <DeleteOutlined /> Delete
                    </button>
                </>
            ),
        },
    ];

    return (
        <div className='user-table'>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />

            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser} />

            <DetailUserDrawer
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail} />
        </div>
    );
}



export default UserTable;