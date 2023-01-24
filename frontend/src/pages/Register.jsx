import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too Short')
    .max(18, 'Name is too Long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must not exceed 32 characters')
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
    .required('Confirm Password is required'),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  // @TODO: add a spinner component
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-lg md:max-w-screen-md mx-auto'>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          password2: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          const { name, email, password } = values;
          const userData = {
            name,
            email,
            password,
          };
          dispatch(register(userData))
            .unwrap()
            .then((user) => {
              toast.success(`Registered new user - ${user.name}`);
              navigate('/');
            })
            .catch(toast.error);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className='hero bg-base-200 py-3 px-4 shadow-xl rounded-box'>
              <div className='hero-content flex-col md:flex-row-reverse'>
                <div className='text-center md:text-left'>
                  <h1 className='text-5xl font-bold'>Register now!</h1>
                  <p className='py-4'>
                    Create new quizes and place high in rankings!
                  </p>
                </div>
                <div className='card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100'>
                  <div className='card-body'>
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text'>Name</span>
                      </label>
                      <Field
                        name='name'
                        type='text'
                        placeholder='name'
                        className='input input-bordered'
                      />
                      {errors.name && touched.name && (
                        <div className='text-error text-xs italic'>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text'>Email</span>
                      </label>
                      <Field
                        name='email'
                        type='email'
                        placeholder='email'
                        className='input input-bordered'
                      />
                      {errors.email && touched.email && (
                        <div className='text-error text-xs italic'>
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text'>Password</span>
                      </label>
                      <Field
                        name='password'
                        type='password'
                        placeholder='password'
                        className='input input-bordered'
                      />
                      {errors.password && touched.password && (
                        <div className='text-error text-xs italic'>
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text'>Confirm Password</span>
                      </label>
                      <Field
                        name='password2'
                        type='password'
                        placeholder='password'
                        className='input input-bordered'
                      />
                      {errors.password2 && touched.password2 && (
                        <div className='text-error text-xs italic'>
                          {errors.password2}
                        </div>
                      )}
                    </div>
                    <div className='form-control mt-6'>
                      <button type='submit' className='btn btn-primary'>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
