import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import QuizCreator from './pages/QuizCreator';
import QuizCreatorEdit from './pages/QuizCreatorEdit';

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
              <Route
                path='/quiz/creator'
                element={
                  <PrivateRoute>
                    <QuizCreator />
                  </PrivateRoute>
                }
              />
              <Route
                path='/quiz/creator/:id'
                element={
                  <PrivateRoute>
                    <QuizCreatorEdit />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
      <ToastContainer theme='dark' autoClose={3500} />
    </>
  );
}

export default App;
