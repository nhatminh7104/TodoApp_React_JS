import UserForm from '../components/user/user.form.jsx';
import UserTable from '../components/user/user.table.jsx';
import { fetchAllUsersAPI } from '../services/api.service';
import { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [total, setTotal] = useState(0);

    useEffect(() => { loadUser(); }, [current])

    const loadUser = async () => {
        const response = await fetchAllUsersAPI(current, pageSize);
        if (response.data) {
            setDataUsers(response.data.result);
            setCurrent(response.data.meta.current);
            setPageSize(response.data.meta.pageSize);
            setTotal(response.data.meta.total)
        }
    }

    return (
        <div>
            <div>
                <UserForm loadUser={loadUser} />
                <UserTable
                    dataUsers={dataUsers}
                    loadUser={loadUser}
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                />
            </div>
        </div>
    );
}

export default UserPage;