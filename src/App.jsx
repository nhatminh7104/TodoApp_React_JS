import './components/todo/todo.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.service';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';

const App = () => {
  const { setUser } = useContext(AuthContext);

  const fetchUserInfo = async () => {
    const response = await getAccountAPI();

    if (response.data) {
      setUser(response.data.user);
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <div className="app-wrapper">
      <Header />

      <div className='app-content'>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;