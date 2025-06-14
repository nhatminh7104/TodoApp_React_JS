import './components/todo/todo.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';

const App = () => {

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