import { Space, Table, Tag } from 'antd';
import { fetchAllUsersAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([
        { _id: 1, fullName: "Minh", email: "minh@gmail.com" },
        { _id: 2, fullName: "Tien", email: "tien@gmail.com" },
    ]);

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
            render: (_, record) => (
                <Space size="middle">
                    <a>View {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const loadUser = async () => {
        const response = await fetchAllUsersAPI();
        setDataUsers(response.data);
    }

    return (
        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    );
}



export default UserTable;