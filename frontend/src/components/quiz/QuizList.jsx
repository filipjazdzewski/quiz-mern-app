import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getQuizzes } from '../../features/quiz/quizSlice';
import { MdOutlineQuiz } from 'react-icons/md';
import { BsQuestionCircle } from 'react-icons/bs';
import QuizItem from './QuizItem';
import Spinner from '../../layout/Spinner';

function QuizList() {
  const dispatch = useDispatch();

  const { quizzes, isLoading } = useSelector((state) => state.quiz);

  // useMemo
  const numberOfQuizes = useMemo(() => quizzes.length, [quizzes]);
  const numberOfOverallQuestions = useMemo(() => {
    return quizzes.reduce((acc, curr) => {
      return curr.questions.length + acc;
    }, 0);
  }, [quizzes]);

  useEffect(() => {
    dispatch(getQuizzes()).unwrap().catch(toast.error);
  }, [dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <div className='stats bg-base-200 shadow-xl mb-8 flex'>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <MdOutlineQuiz className='inline-block w-8 h-8 stroke-current' />
          </div>
          <div className='stat-title'>Quizes</div>
          <div className='stat-value'>{numberOfQuizes}</div>
          <div className='stat-desc'>Overall number</div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <BsQuestionCircle className='inline-block w-8 h-8 stroke-current' />
          </div>
          <div className='stat-title'>Questions</div>
          <div className='stat-value'>{numberOfOverallQuestions}</div>
          <div className='stat-desc'>Overall number</div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2'>
        {quizzes.map((quiz) => (
          <QuizItem key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </>
  );
}

export default QuizList;
