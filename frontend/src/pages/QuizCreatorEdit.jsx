import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { FaSave, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuiz, deleteQuiz, updateQuiz } from '../features/quiz/quizSlice';
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
} from '../features/question/questionSlice';
import Spinner from '../layout/Spinner';
import QuestionList from '../components/questions/QuestionList';
import moment from 'moment';

// Modal style
const customStyles = {
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    width: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    backgroundColor: '#20222c',
    border: 'none',
    borderRadius: '10px',
  },
};

Modal.setAppElement('#root');

// Question validation
const CreateQuestionSchema = Yup.object().shape({
  questionTitle: Yup.string()
    .min(3, 'Question is too Short')
    .max(80, 'Question is too Long')
    .required('Question is required'),
});

function QuizCreatorEdit() {
  const { user } = useSelector((state) => state.auth);
  const { quiz, isLoading } = useSelector((state) => state.quiz);
  const { questions } = useSelector((state) => state.question);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(0);
  const [correctOptions, setCorrectOptions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchGetQuiz = () => {
    dispatch(getQuiz(id))
      .unwrap()
      .then((quiz) =>
        quiz.user !== user._id
          ? navigate('/')
          : dispatch(getQuestions(quiz.questions))
      )
      .catch(toast.error);
  };

  const handleChangeQuizTitle = () => {
    const updateData = { title: titleText };
    dispatch(updateQuiz({ quizId: quiz._id, updateData }))
      .unwrap()
      .then(() => {
        setTitleText('');
        closeModal();
        fetchGetQuiz();
        toast.success(`Successfully edited the quiz`);
      })
      .catch(toast.error);
  };

  // Delete Question
  const handleDeleteQuestion = (questionId) => {
    dispatch(deleteQuestion({ questionId: questionId, quizId: quiz._id }))
      .unwrap()
      .then(() => {
        fetchGetQuiz();
        toast.success(`Successfully deleted the question`);
      })
      .catch(toast.error);
  };

  // Delete Quiz
  const handleDeleteQuiz = () => {
    dispatch(deleteQuiz(quiz._id))
      .unwrap()
      .then(() => {
        navigate('/');
        toast.success(`Successfully deleted - ${quiz.title}`);
      })
      .catch(toast.error);
  };

  const resetOptionStates = () => {
    setOptions([]);
    setCorrectOption(0);
    setCorrectOptions([]);
  };

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
  };

  useEffect(() => {
    fetchGetQuiz();
  }, []);

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading) {
    return <Spinner />;
  }

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
            <div className='btn-group'>
              <button
                onClick={openModal}
                className='btn btn-sm tooltip tooltip-left tooltip-info'
                data-tip='Edit the title'
              >
                <FaEdit />
              </button>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Edit Quiz Title'
                style={customStyles}
              >
                <div className='flex flex-col gap-3'>
                  <h1 className='font-bold text-xl'>Edit quiz title</h1>
                  <button
                    onClick={closeModal}
                    className='btn btn-sm btn-circle absolute right-2 top-2'
                  >
                    ✕
                  </button>
                  <form onSubmit={handleChangeQuizTitle}>
                    <div className='form-control mb-3'>
                      <input
                        name='titleText'
                        type='text'
                        placeholder='Enter new title'
                        className='input input-bordered'
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                      />
                    </div>
                    <div className='form-control'>
                      <button type='submit' className='btn btn-sm btn-primary'>
                        Edit
                      </button>
                    </div>
                  </form>
                </div>
              </Modal>

              <button
                onClick={handleDeleteQuiz}
                className='btn btn-sm tooltip tooltip-right tooltip-error'
                data-tip='Delete the quiz'
              >
                <FaTrashAlt />
              </button>
            </div>
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
                    {values.typeOfQuestion &&
                      values.typeOfQuestion !== 'TrueOrFalse' && (
                        <button
                          type='button'
                          className='btn btn-primary'
                          onClick={handleAddOption}
                        >
                          Add New Option
                        </button>
                      )}

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      {values.typeOfQuestion === 'SingleChoice' && (
                        <>
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
                    </div>
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

      <div>
        <QuestionList
          questions={questions}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </div>
    </div>
  );
}

export default QuizCreatorEdit;
