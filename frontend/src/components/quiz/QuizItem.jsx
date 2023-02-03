import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt, FaThumbsUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteQuiz,
  likeQuiz,
  unlikeQuiz,
} from '../../features/quiz/quizSlice';
import io from 'socket.io-client';

const socket = io.connect(import.meta.env.VITE_API);

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
  const [howManyQuestions, setHowManyQuestions] = useState(
    quiz.questions.length
  );
  const [howManyLikes, setHowManyLikes] = useState(quiz.likes.length);
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
      .then(() => {
        setHowManyLikes((prev) => prev + 1);
        socket.emit('click_like_button', howManyLikes + 1);
      })
      .catch(toast.error);
  };

  const handleUnlike = () => {
    dispatch(unlikeQuiz(quizId))
      .unwrap()
      .then(() => {
        setHowManyLikes((prev) => prev - 1);
        socket.emit('click_like_button', howManyLikes - 1);
      })
      .catch(toast.error);
  };

  useEffect(() => {
    socket.on('receive_like_data', (data) => {
      setHowManyLikes(data);
    });
    socket.on('receive_questions_length', (data) => {
      setHowManyQuestions(data);
    });
  }, [socket]);

  return (
    <>
      <div className='card bg-base-200 shadow-xl'>
        <figure className='bg-primary h-40'>Image</figure>
        <div className='card-body p-6 pt-2'>
          <div className='flex justify-between'>
            <div className='badge badge-secondary'>{howManyQuestions} Qs</div>
            <div className='badge badge-secondary'>{howManyLikes} likes</div>
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
