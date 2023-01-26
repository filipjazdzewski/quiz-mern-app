import axios from 'axios';

const API_LOCALHOST_URL = import.meta.env.VITE_API;
const API_URL = `${API_LOCALHOST_URL}/api/quizzes`;

const getQuizzes = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const quizService = { getQuizzes };

export default quizService;
