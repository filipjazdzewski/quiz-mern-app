import { useSelector } from 'react-redux';
import QuizItem from './QuizItem';
import Spinner from '../../layout/Spinner';

function QuizList() {
  const { quizzes, isLoading } = useSelector((state) => state.quiz);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {quizzes.length > 0 ? (
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2'>
          {quizzes.map((quiz) => (
            <QuizItem key={quiz._id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div>No Quizzes Yet...</div>
      )}
    </>
  );
}

export default QuizList;
