import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineQuiz } from 'react-icons/md';
import { BsQuestionCircle } from 'react-icons/bs';

function QuizStats() {
  const { quizzes } = useSelector((state) => state.quiz);
  // useMemo
  const numberOfQuizes = useMemo(() => quizzes.length, [quizzes]);
  const numberOfOverallQuestions = useMemo(() => {
    return quizzes.reduce((acc, curr) => {
      return curr.questions.length + acc;
    }, 0);
  }, [quizzes]);

  return (
    <div className='stats flex bg-base-200 shadow-xl'>
      <div className='stat'>
        <div className='stat-figure text-secondary'>
          <MdOutlineQuiz className='inline-block w-8 h-8 stroke-current' />
        </div>
        <div className='stat-title'>Quizzes</div>
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
  );
}

export default QuizStats;
