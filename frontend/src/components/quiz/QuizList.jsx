import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getQuizzes } from '../../features/quiz/quizSlice';
import QuizItem from './QuizItem';
import Spinner from '../../layout/Spinner';

function QuizList() {
  const dispatch = useDispatch();

  const { quizzes, isLoading } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(getQuizzes()).unwrap().catch(toast.error);
  }, [dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2'>
      {quizzes.map((quiz) => (
        <QuizItem key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
}

export default QuizList;
