import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaPlusCircle,
} from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    // z-50 makes the navbar on top of every other component fixing the bugs where it was under
    <nav className='navbar mb-8 shadow-lg bg-base-200 bg-opacity-40 backdrop-filter backdrop-blur-lg border-b border-base-300 sticky top-0 z-50 text-neutral-content'>
      <div className='navbar-start'>
        <Link to='/' className='text-2xl sm:text-4xl font-bold'>
          QuizApp
        </Link>
      </div>
      <div className='navbar-end'>
        <div className='hidden md:block'>
          <ul className='flex justify-end px-2 mx-2 gap-2'>
            {user ? (
              <>
                <li>
                  <Link to='/quiz/creator' className='btn btn-secondary btn-sm'>
                    <FaPlusCircle /> Create a quiz
                  </Link>
                </li>
                <li>
                  <div className='dropdown dropdown-bottom dropdown-end'>
                    <label
                      tabIndex={0}
                      className='btn btn-ghost btn-circle btn-sm'
                    >
                      <RxHamburgerMenu className='h-6 w-6' />
                    </label>
                    <ul
                      tabIndex={0}
                      className='dropdown-content menu shadow-lg bg-base-200 bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-box w-52 mt-4'
                    >
                      <li className='hover-bordered'>
                        <Link to='/profile'>
                          <FaUser /> Account
                        </Link>
                      </li>
                      <li className='hover-bordered'>
                        <button onClick={onLogout}>
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login' className='btn btn-ghost btn-sm'>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to='/register' className='btn btn-primary btn-sm'>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className='dropdown dropdown-bottom dropdown-end md:hidden'>
          <label tabIndex={0} className='btn btn-ghost btn-circle btn-sm'>
            <RxHamburgerMenu className='h-6 w-6' />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu shadow-lg bg-base-200 bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-box w-52 mt-4'
          >
            {user ? (
              <>
                <li className='hover-bordered'>
                  <Link to='/profile'>
                    <FaUser /> Account
                  </Link>
                </li>
                <li className='hover-bordered'>
                  <Link to='/quiz/creator'>
                    <FaPlusCircle /> Create a quiz
                  </Link>
                </li>
                <li className='hover-bordered'>
                  <button onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='hover-bordered'>
                  <Link to='/login'>
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li className='hover-bordered'>
                  <Link to='/register'>
                    <FaUserPlus /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
