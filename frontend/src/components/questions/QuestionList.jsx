import QuestionItem from './QuestionItem';

function QuestionList({ questions, handleDeleteQuestion }) {
  return (
    <div className='grid grid-cols-1 gap-8'>
      {questions.map((question) => (
        <QuestionItem
          key={question._id}
          question={question}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      ))}
    </div>
  );
}

export default QuestionList;
