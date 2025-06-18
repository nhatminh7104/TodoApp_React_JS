import UserForm from '../components/user/user.form.jsx';
import UserTable from '../components/user/user.table.jsx';
import { fetchAllUsersAPI } from '../services/api.service';
import { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => { loadUser(); }, [])

    const loadUser = async () => {
        const response = await fetchAllUsersAPI();
        setDataUsers(response.data);
    }

    return (
        <div>
            <div>
                <UserForm loadUser={loadUser} />
                <UserTable dataUsers={dataUsers} loadUser={loadUser} />
            </div>
        </div>
    );
}

export default UserPage;