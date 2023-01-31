import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuiz } from '../features/quiz/quizSlice';
import Spinner from '../layout/Spinner';

function QuizPlay() {
  const { quiz, isLoading } = useSelector((state) => state.quiz);
  const [questions, setQuestions] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleClickNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizFinished(true);
    }
  };

  // function shuffleQuestions(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }

  // console.log(questions[currentQuestion]);

  const fetchGetQuiz = () => {
    dispatch(getQuiz(id))
      .unwrap()
      .then((quiz) => {
        setQuestions(quiz.questions);
      });
  };

  useEffect(() => {
    fetchGetQuiz();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (questions.length > 0) {
    if (isQuizFinished) {
      return (
        <div className='max-w-lg md:max-w-screen-md mx-auto'>
          <div className='card w-full shadow-2xl bg-base-200'>
            <div className='card-body text-center items-center'>
              Score: {score}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='max-w-lg md:max-w-screen-md mx-auto'>
        <div className='card w-full shadow-2xl bg-base-200'>
          <div className='card-body flex flex-row'>
            <div className='w-1/2'>
              <div className='card-title'>
                Question {currentQuestionIndex + 1}/{questions.length}
              </div>
              <div className='badge badge-secondary badge-outline'>
                Category: {questions[currentQuestionIndex].typeOfQuestion}
              </div>
              <div className='py-4'>
                {questions[currentQuestionIndex].questionTitle}
              </div>
              <button
                onClick={handleClickNext}
                className='btn btn-primary btn-sm'
              >
                Next
              </button>
            </div>
            <div className='w-1/2'>
              <div className='grid grid-cols-1 gap-4'>
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div
                      key={`${option.optionTitle}-${index}`}
                      className='card card-body bg-base-300'
                    >
                      {option.optionTitle}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizPlay;
