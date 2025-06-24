import { NavLink, Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    BookOutlined,
    HomeOutlined,
    SettingOutlined,
    UserOutlined,
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
        {
            label: 'Control',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    type: <Link to={"/login"}>Login</Link>,
                    label: 'login',
                },
                {
                    type: "Logout",
                    label: 'logout',
                },
            ],
        }
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