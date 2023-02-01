import { RiDeleteBin5Line } from 'react-icons/ri';

function QuestionItem({ question, handleDeleteQuestion }) {
  return (
    <>
      <div className='card bg-base-200 shadow-xl'>
        <div className='card-body p-6 pt-2'>
          <div className='flex gap-2'>
            <div className='badge badge-secondary badge-outline'>
              {question.typeOfQuestion}
            </div>
            <div className='badge badge-secondary badge-outline'>
              {question?.options.length} options
            </div>
          </div>
          <h2 className='card-title'>
            <div>Question: {question.questionTitle}</div>
          </h2>
          <div className='card-actions justify-end'>
            <button
              onClick={() => handleDeleteQuestion(question._id)}
              className='btn btn-primary btn-sm'
            >
              <RiDeleteBin5Line />
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {question.options.map((option, index) => (
          <div key={`${option.optionTitle}${index}`}>
            {option.isCorrect ? (
              <div className='card card-compact bg-primary'>
                <h1 className='card-body'>{option.optionTitle}</h1>
              </div>
            ) : (
              <div className='card card-compact bg-neutral'>
                <h1 className='card-body'>{option.optionTitle}</h1>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default QuestionItem;
