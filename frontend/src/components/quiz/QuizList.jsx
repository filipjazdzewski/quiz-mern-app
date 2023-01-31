import { useSelector } from 'react-redux';
import QuizItem from './QuizItem';
import Spinner from '../../layout/Spinner';

function QuizList() {
  const { quizzes } = useSelector((state) => state.quiz);

  return (
    <>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2'>
        {quizzes.map((quiz) => (
          <QuizItem key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </>
  );
}

export default QuizList;
