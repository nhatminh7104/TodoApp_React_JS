import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Popconfirm, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useEffect, useState } from 'react';
import DetailUserDrawer from './detail.user.drawer';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {
    const {
        dataUsers, loadUser,
        current, setCurrent,
        pageSize, setPageSize,
        total
    } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleConfirmBtn = async (id) => {
        const response = await deleteUserAPI(id);

        if (response.data) {
            notification.success({
                message: "Delete user",
                description: "Delete user successfully!"
            })
            await loadUser();
        } else
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(response.message)
            })
    };

    const onChange = async (pagination) => {
        if (pagination && pagination.current)
            if (+pagination.current !== +current)
                setCurrent(+pagination.current);
    };

    const columns = [
        {
            title: 'Serial Number',
            render: (_, record, index) => {
                return (
                    index + 1 + ((current - 1) * pageSize)
                )
            }
        },
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

                    <Popconfirm
                        className='delete-btn'
                        title="Delete user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => handleConfirmBtn(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'>

                        <DeleteOutlined /> Delete
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className='user-table'>
            <Table
                columns={columns} dataSource={dataUsers} rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: false,
                        total: total,
                        // showTotal: (total, range) => <div> {range[0]}-{range[1]} on {total} rows</div>
                    }
                }
                onChange={onChange}
            />

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
                setDataDetail={setDataDetail}
                loadUser={loadUser} />
        </div>
    );
}



export default UserTable;