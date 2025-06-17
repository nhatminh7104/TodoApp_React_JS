import { Space, Table } from 'antd';

const UserTable = (props) => {
    const { dataUsers } = props;

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
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
            width: 120,
            render: (_, record) => (
                <Space size="middle">
                    <button className='edit-btn'>
                        <a>View {record.name}</a>
                    </button>
                    <button className='delete-btn'>
                        <a>Delete</a>
                    </button>
                </Space>
            ),
        },
    ];

    return (
        <div className='user-table'>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
        </div>
    );
}



export default UserTable;