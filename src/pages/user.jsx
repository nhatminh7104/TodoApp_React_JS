import UserForm from '../components/user/user.form.jsx';
import UserTable from '../components/user/user.table.jsx';
import { fetchAllUsersAPI } from '../services/api.service';
import { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { loadUser(); }, [current])

    const loadUser = async () => {
        setIsLoading(true);
        const response = await fetchAllUsersAPI(current, pageSize);

        if (response.data) {
            setDataUsers(response.data.result);
            setTotal(response.data.meta.total)
        }

        setIsLoading(false);
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
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
        </div>
    );
}

export default UserPage;