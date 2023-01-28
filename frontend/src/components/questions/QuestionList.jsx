import QuestionItem from './QuestionItem';

function QuestionList({ questions, quizId }) {
  return (
    <div className='grid grid-cols-1 gap-8'>
      {questions.map((question) => (
        <QuestionItem key={question._id} question={question} quizId={quizId} />
      ))}
    </div>
  );
}

export default QuestionList;
