import { NavLink, Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    BookOutlined,
    HomeOutlined,
    SettingOutlined,
    UserOutlined,
    LoginOutlined,
    AliwangwangOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const [current, setCurrent] = useState("");
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (window.location.pathname === "/")
            setCurrent("home");
        else if (window.location.pathname === "/users")
            setCurrent("users");
        else
            setCurrent("books");
    }, []);

    const onClick = (e) => {
        setCurrent(e.key);
    };

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
            label: <Link to={"/login"} >Login</Link>,
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