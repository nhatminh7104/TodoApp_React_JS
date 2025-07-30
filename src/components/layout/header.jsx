import { NavLink, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Menu, message } from 'antd';
import {
    BookOutlined,
    HomeOutlined,
    UserOutlined,
    LoginOutlined,
    AliwangwangOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {
    const [current, setCurrent] = useState("");
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname.slice(1);
        const currentRoute = currentPath === "" ? "home" : currentPath;
        setCurrent(currentRoute);
    }, [location.pathname]);

    const onClick = (e) => {
        setCurrent(e.key);

        if (e.key === "logout")
            handleLogOut();
    };

    const handleLogOut = async () => {
        console.log("Logout clicked!")
        const response = await logoutAPI();
        if (response.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success("Logout succeed");
            navigate("/");
        }
    }

    const items = [
        {
            label: <NavLink to="/" >Home</NavLink>,
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: <NavLink to="/users" >Users</NavLink>,
            key: 'users',
            icon: <UserOutlined />
        },
        {
            label: <NavLink to="/books" >Books</NavLink>,
            key: 'books',
            icon: <BookOutlined />
        },

        ...(!user.id ? [{
            label: <Link to={"/login"} >Log In</Link>,
            key: 'login',
            icon: <LoginOutlined />
        }] : []),

        ...(user.id ? [{
            label: `Welcome, ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: 'Log Out',
                    key: 'logout'
                },
            ],
        }] : [])
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
}

export default Header;