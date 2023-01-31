import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaSave } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuiz } from '../features/quiz/quizSlice';
import { createQuestion } from '../features/question/questionSlice';
import Spinner from '../layout/Spinner';
import QuestionList from '../components/questions/QuestionList';
import moment from 'moment';

const CreateQuestionSchema = Yup.object().shape({
  questionTitle: Yup.string()
    .min(3, 'Question is too Short')
    .max(80, 'Question is too Long')
    .required('Question is required'),
});

function QuizCreatorEdit() {
  const { user } = useSelector((state) => state.auth);
  const { quiz, isLoading } = useSelector((state) => state.quiz);
  const [questions, setQuestions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchGetQuiz = () => {
    dispatch(getQuiz(id))
      .unwrap()
      .then((quiz) =>
        quiz.user !== user._id ? navigate('/') : setQuestions(quiz.questions)
      )
      .catch(toast.error);
  };

  const resetOptionStates = () => {
    setOptions([]);
    setCorrectOption(0);
    setCorrectOptions([]);
  };

  const handleDeleteQuestion = (questionId) => {
    console.log(questionId);
    dispatch(deleteQuestion(questionId))
      .unwrap()
      .then(() => {
        fetchGetQuiz();
        toast.success('Successfully deleted the question');
      })
      .catch(toast.error);
  };

  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(0);

  const [correctOptions, setCorrectOptions] = useState([]);

  const updateCheckStatus = (idx) => {
    const newCorrects = correctOptions.map((option, index) =>
      idx === index ? !option : option
    );
    setCorrectOptions(newCorrects);
  };

  const handleAddOption = () => {
    if (options.length <= 6 - 1) {
      setOptions((prevOptions) => [
        ...prevOptions,
        { optionTitle: '', isCorrect: false },
      ]);
      setCorrectOptions((prev) => [...prev, false]);
    }
  };

  const handleOptionTitleChange = (e, idx) => {
    e.preventDefault();
    const newOptions = [...options];
    newOptions[idx].optionTitle = e.target.value;
    setOptions(newOptions);
    console.log(correctOptions);
  };

  useEffect(() => {
    fetchGetQuiz();
  }, []);

  return (
    <div className='max-w-lg md:max-w-screen-md mx-auto'>
      <div className='my-8'>
        <div className='card bg-base-200'>
          <div className='card-body items-center'>
            <h1 className='card-title text-center text-3xl md:text-5xl text-neutral-content font-bold'>
              {quiz.title}
            </h1>
            <p className='card-describtion'>
              Last updated: {moment(quiz.updatedAt).calendar()}
            </p>
          </div>
        </div>
      </div>
      <div className='my-8'>
        <Formik
          initialValues={{
            questionTitle: '',
            typeOfQuestion: '',
            options: options,
          }}
          validationSchema={CreateQuestionSchema}
          onSubmit={(values, { resetForm }) => {
            const { questionTitle, typeOfQuestion } = values;
            const questionData = {
              quizId: `${quiz._id}`,
              questionTitle,
              typeOfQuestion,
              options,
            };
            if (typeOfQuestion === 'SingleChoice') {
              options.map((option, index) =>
                index === correctOption ? (option.isCorrect = true) : option
              );
            }
            if (typeOfQuestion === 'MultipleChoices') {
              options.map(
                (option, index) => (option.isCorrect = correctOptions[index])
              );
            }
            dispatch(createQuestion(questionData))
              .unwrap()
              .then(() => {
                fetchGetQuiz();
                resetForm();
                resetOptionStates();
                toast.success('Successfully saved the question');
              })
              .catch(toast.error);
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              <div className='card bg-base-200'>
                <div className='card-body items-center'>
                  <div className='flex flex-col md:flex-row w-full gap-6 mb-4'>
                    <div className='form-control w-full'>
                      <Field
                        name='questionTitle'
                        type='text'
                        placeholder='Enter a question'
                        className='input input-bordered'
                      />
                      {errors.questionTitle && touched.questionTitle && (
                        <div className='text-error text-xs italic'>
                          {errors.questionTitle}
                        </div>
                      )}
                    </div>
                    <div className='form-control w-full md:w-1/2'>
                      <Field
                        as='select'
                        name='typeOfQuestion'
                        className='select select-primary w-full'
                        required
                      >
                        <option disabled value=''>
                          Choose question type
                        </option>
                        <option value='SingleChoice'>Single Choice</option>
                        <option value='MultipleChoices'>
                          Multiple Choices
                        </option>
                        <option value='TrueOrFalse'>True or False</option>
                      </Field>
                    </div>
                  </div>
                  <div className='flex flex-col items-center gap-4'>
                    {values.typeOfQuestion && (
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={handleAddOption}
                      >
                        Add New Option
                      </button>
                    )}
                    {values.typeOfQuestion === 'SingleChoice' && (
                      <>
                        {options.length > 0 && (
                          <div className='text-sm'>(Mark the correct one)</div>
                        )}
                        {options.map((_, idx) => (
                          <div
                            className='flex flex-row items-center gap-2'
                            key={idx}
                          >
                            <div className='form-control'>
                              <input
                                className='radio radio-primary'
                                type='radio'
                                name='isCorrect'
                                value={idx}
                                onChange={() => setCorrectOption(idx)}
                              />
                            </div>
                            <div className='form-control'>
                              <input
                                className='input input-bordered'
                                placeholder='Enter an option'
                                type='text'
                                name='isCorrect'
                                value={options[idx].optionTitle}
                                onChange={(e) =>
                                  handleOptionTitleChange(e, idx)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {values.typeOfQuestion === 'MultipleChoices' && (
                      <>
                        {options.length > 0 && (
                          <div className='text-sm'>(Mark the correct ones)</div>
                        )}
                        {options.map((option, idx) => (
                          <div
                            className='flex flex-row items-center gap-2'
                            key={idx}
                          >
                            <div className='form-control'>
                              <input
                                className='checkbox checkbox-primary'
                                type='checkbox'
                                onChange={() => updateCheckStatus(idx)}
                                index={idx}
                              />
                            </div>
                            <div className='form-control'>
                              <input
                                className='input input-bordered'
                                placeholder='Enter an option'
                                type='text'
                                name='isCorrect'
                                value={options[idx].optionTitle}
                                onChange={(e) =>
                                  handleOptionTitleChange(e, idx)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    {values.typeOfQuestion === 'TrueOrFalse' && <></>}
                    <div className='form-control mt-6'>
                      <button type='submit' className='btn btn-primary'>
                        <FaSave /> Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <QuestionList questions={questions} quizId={quiz._id} />
        </div>
      )}
    </div>
  );
}

export default QuizCreatorEdit;
