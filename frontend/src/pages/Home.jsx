import QuizSearch from '../components/quiz/QuizSearch';
import QuizStats from '../components/quiz/QuizStats';
import QuizList from '../components/quiz/QuizList';

function Home() {
  return (
    <div className='grid grid-cols-1 gap-8'>
      <QuizStats />
      <QuizSearch />
      <QuizList />
    </div>
  );
}

export default Home;
