import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteQuiz,
  likeQuiz,
  unlikeQuiz,
} from '../../features/quiz/quizSlice';

function QuizItem({ quiz }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // Check if the logged in user is the author of the quiz
  const isAuthor = quiz.user === user?._id;

  // Check if the quiz is liked
  const isLiked = user && quiz.likes.includes(user._id);

  // **** QUIZ VARIABLES ****
  const quizId = quiz._id;
  const quizTitle =
    quiz.title.length > 25 ? `${quiz.title.slice(0, 23)}...` : quiz.title;
  const howManyQuestions = quiz.questions.length;
  const howManyTimesPlayed =
    quiz.ranking.length > 999
      ? `${quiz.ranking.length / 1000}k`
      : quiz.ranking.length;
  // **** QUIZ VARIABLES ****

  const handleDelete = () => {
    dispatch(deleteQuiz(quizId))
      .unwrap()
      .then(toast.success(`Successfully deleted - ${quizTitle}`))
      .catch(toast.error);
  };

  const handleLike = () => {
    dispatch(likeQuiz(quizId))
      .unwrap()
      .then(toast.success(`Liked ${quizTitle}`))
      .catch(toast.error);
  };

  const handleUnlike = () => {
    dispatch(unlikeQuiz(quizId))
      .unwrap()
      .then(toast.success(`Unliked ${quizTitle}`))
      .catch(toast.error);
  };

  return (
    <>
      <div className='card bg-base-200 shadow-xl'>
        <figure>
          <img
            src='https://placeimg.com/520/220/tech/sepia'
            alt='quiz'
            className='w-full'
          />
        </figure>
        <div className='card-body p-6 pt-2'>
          <div className='flex justify-between'>
            <div className='badge badge-secondary'>{howManyQuestions} Qs</div>
            <div className='badge badge-secondary'>
              {howManyTimesPlayed} plays
            </div>
          </div>
          <h2 className='card-title'>{quizTitle}</h2>
          <div className='card-actions justify-end'>
            {isAuthor && (
              <>
                <Link
                  to={`/quiz/creator/${quizId}`}
                  className='btn btn-primary btn-sm'
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={handleDelete}
                  className='btn btn-primary btn-sm'
                >
                  <FaTrashAlt />
                </button>
              </>
            )}
            {!isAuthor && user && (
              <div>
                {isLiked ? (
                  <button onClick={handleUnlike} className='btn btn-sm'>
                    <FaThumbsUp className='text-primary' />
                  </button>
                ) : (
                  <button onClick={handleLike} className='btn btn-sm'>
                    <FaThumbsUp />
                  </button>
                )}
              </div>
            )}
            <Link
              to={`/quiz/play/${quizId}`}
              className='btn btn-primary btn-sm'
            >
              Play
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizItem;
