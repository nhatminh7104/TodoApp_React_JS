import './components/todo/todo.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.service';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';
import { Spin } from 'antd';

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  const fetchUserInfo = async () => {
    setIsAppLoading(true);
    const response = await getAccountAPI();

    if (response.data)
      setUser(response.data.user);

    setIsAppLoading(false);
  }

  useEffect(() => { fetchUserInfo() }, [])

  return (
    <div className="app-wrapper">
      {
        isAppLoading === true ?
          <div className="spin-container">
            <Spin size="large" tip="Loading">
              <div style={{ width: 100, height: 100 }}></div>
            </Spin>
          </div> :
          <>
            <Header />

            <div className='app-content'>
              <Outlet />
            </div>

            <Footer />
          </>
      }
    </div>
  );
}

export default App;