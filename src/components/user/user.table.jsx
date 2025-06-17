import { Space, Table, Tag } from 'antd';
import { fetchAllUsersAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => { loadUser(); }, [])

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

    const loadUser = async () => {
        const response = await fetchAllUsersAPI();
        setDataUsers(response.data);
    }

    return (
        <div className='user-table'>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
        </div>
    );
}



export default UserTable;