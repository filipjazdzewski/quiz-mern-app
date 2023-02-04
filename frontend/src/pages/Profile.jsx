import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, deleteUser, updateUser } from '../features/auth/authSlice';
import Spinner from '../layout/Spinner';

const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too Short')
    .max(18, 'Name is too Long')
    .required('Name is required'),
  oldPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must not exceed 32 characters')
    .required('Old password is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must not exceed 32 characters')
    .required('Password is required'),
});

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.auth);

  const handleDeleteAccount = () => {
    dispatch(deleteUser(user._id)).then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='max-w-lg md:max-w-screen-md mx-auto'>
        <Formik
          initialValues={{
            name: '',
            oldPassword: '',
            password: '',
          }}
          validationSchema={UpdateSchema}
          onSubmit={(values, { resetForm }) => {
            const { name, oldPassword, password } = values;
            const updateData = {
              name,
              oldPassword,
              password,
            };
            console.log(updateData);
            dispatch(updateUser({ userId: user._id, updateData }))
              .unwrap()
              .then(() => {
                resetForm();
                toast.success(`Successfully updated`);
              })
              .catch(toast.error);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='hero bg-base-200 py-3 px-4 shadow-xl rounded-box'>
                <div className='hero-content flex-col md:flex-row-reverse'>
                  <div className='text-center md:text-left'>
                    <h1 className='text-5xl font-bold'>Update Account!</h1>
                    <p className='py-4'>
                      You can edit your name and your password
                    </p>
                    <button
                      type='button'
                      onClick={handleDeleteAccount}
                      className='btn btn-outline btn-error'
                    >
                      Delete Account
                    </button>
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
                          placeholder='Enter new name'
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
                          <span className='label-text'>Old Password</span>
                        </label>
                        <Field
                          name='oldPassword'
                          type='password'
                          placeholder='Enter old password'
                          className='input input-bordered'
                        />
                        {errors.oldPassword && touched.oldPassword && (
                          <div className='text-error text-xs italic'>
                            {errors.oldPassword}
                          </div>
                        )}
                      </div>
                      <div className='form-control'>
                        <label className='label'>
                          <span className='label-text'>New Password</span>
                        </label>
                        <Field
                          name='password'
                          type='password'
                          placeholder='Enter new password'
                          className='input input-bordered'
                        />
                        {errors.password && touched.password && (
                          <div className='text-error text-xs italic'>
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className='form-control mt-6'>
                        <button type='submit' className='btn btn-primary'>
                          Update
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
    </>
  );
}

export default Profile;
