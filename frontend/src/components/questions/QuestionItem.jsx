import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../../features/question/questionSlice';

function QuestionItem({ question, quizId }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteQuestion(question._id, quizId))
      .unwrap()
      .then(toast.success(`Successfully deleted the question`))
      .catch(toast.error);
  };

  return (
    <>
      <div className='card bg-base-200 shadow-xl'>
        <div className='card-body p-6 pt-2'>
          <h2 className='card-title'>
            <div>{question.questionTitle}</div>
            <div className='badge badge-primary badge-outline'>
              {question?.options.length} options
            </div>
            <div className='badge badge-secondary badge-outline'>
              {question.typeOfQuestion}
            </div>
          </h2>
          <div className='card-actions justify-end'>
            <button onClick={handleDelete} className='btn btn-primary btn-sm'>
              <RiDeleteBin5Line />
            </button>
          </div>
        </div>
      </div>
      <div>
        {question.options.map((option, index) => (
          <div
            className='chat chat-start'
            key={`${option.optionTitle}${index}`}
          >
            {option.isCorrect ? (
              <div className='chat-bubble chat-bubble-success'>
                {option.optionTitle}
              </div>
            ) : (
              <div className='chat-bubble chat-bubble-error'>
                {option.optionTitle}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default QuestionItem;
