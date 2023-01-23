import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <main className='container sm:max-w-screen-lg mx-auto px-3 pb-12'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
      <ToastContainer theme='dark' autoClose={3500} />
    </>
  );
}

export default App;
