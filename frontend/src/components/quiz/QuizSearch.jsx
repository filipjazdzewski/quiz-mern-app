import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getQuizzes } from '../../features/quiz/quizSlice';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function QuizSearch() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParam = searchParams.get('search');
    dispatch(getQuizzes(searchParam)).unwrap().catch(toast.error);
  }, [searchParams]);

  const handleSearch = (data) => {
    setSearchParams({ search: data.search });
    reset();
  };

  const handleClearSearch = () => {
    setSearchParams({});
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleSearch)} className='form-control'>
      <div className='input-group flex'>
        <input
          type='text'
          placeholder='Search quizzes…'
          className='input input-bordered flex-1'
          {...register('search', {
            required: 'This field is required!',
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        <button className='btn btn-square'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
      {searchParams.get('search') && (
        <div className='flex justify-between mt-4'>
          <div className='text-3xl'>
            Results for{' '}
            <span className='font-bold'>{searchParams.get('search')}</span>
          </div>
          <button onClick={handleClearSearch} className='btn btn-secondary'>
            Clear filter
          </button>
        </div>
      )}
    </form>
  );
}

export default QuizSearch;
