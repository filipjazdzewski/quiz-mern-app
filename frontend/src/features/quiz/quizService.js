import axios from 'axios';

const API_LOCALHOST_URL = import.meta.env.VITE_API;
const API_URL = `${API_LOCALHOST_URL}/api/quizzes`;

// Get all quizes
const getQuizzes = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Create new quiz
const createQuiz = async (quizData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, quizData, config);

  return response.data;
};

const quizService = { getQuizzes, createQuiz };

export default quizService;
