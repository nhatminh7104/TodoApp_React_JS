import UserForm from '../components/user/user.form.jsx';
import UserTable from '../components/user/user.table.jsx';

const UserPage = () => {
    return (
        <div>
            <div>
                <UserForm />
                <UserTable />
            </div>
        </div>
    );
}

export default UserPage;