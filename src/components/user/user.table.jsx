import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import UpdateUserModal from './update.user.modal';

const UserTable = (props) => {
    const { dataUsers } = props;

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#'>{record._id}</a>
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
                    <button className='edit-btn'>
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
            <UpdateUserModal />
        </div>
    );
}



export default UserTable;