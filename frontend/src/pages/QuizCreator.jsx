import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createQuiz } from '../features/quiz/quizSlice';

const CreateQuizSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too Short')
    .max(40, 'Title is too Long')
    .required('Title is required'),
});

function QuizCreator() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: '',
      }}
      validationSchema={CreateQuizSchema}
      onSubmit={(values) => {
        const { title } = values;
        const quizData = {
          title,
        };
        dispatch(createQuiz(quizData))
          .unwrap()
          .then((quiz) => {
            toast.success('Successfully created new quiz');
            // TODO: navigate to quiz/edit/:id
            navigate(`${quiz._id}`);
          })
          .catch(toast.error);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className='max-w-lg md:max-w-screen-md mx-auto'>
            <h1 className='text-center text-5xl md:text-8xl pb-6'>
              Quiz Creator
            </h1>
            <div className='max-w-lg md:max-w-screen-md mx-auto'>
              <div className='card bg-base-200'>
                <div className='card-body items-center'>
                  <h1 className='card-title'>Add a title</h1>
                  <div className='form-control w-full'>
                    <Field
                      name='title'
                      type='text'
                      placeholder='Enter a quiz title'
                      className='input input-bordered'
                    />
                    {errors.title && touched.title && (
                      <div className='text-error text-xs italic'>
                        {errors.title}
                      </div>
                    )}
                  </div>
                  <div className='form-control mt-6'>
                    <button type='submit' className='btn btn-primary'>
                      Start creating!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default QuizCreator;
