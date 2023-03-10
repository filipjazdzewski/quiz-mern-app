import axios from 'axios';

const API_LOCALHOST_URL = import.meta.env.VITE_API;
const API_URL = `${API_LOCALHOST_URL}/api/quizzes`;

// Get quizes
const getQuizzes = async (searchParam) => {
  const response = await axios.get(
    API_URL + (searchParam ? `?search=${searchParam}` : '')
  );

  return response.data;
};

// Get quiz by ID
const getQuiz = async (quizId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/' + quizId, config);

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

// Delete quiz by ID
const deleteQuiz = async (quizId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/' + quizId, config);

  return response.data;
};

// Update quiz by ID
const updateQuiz = async (quizId, updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/' + quizId, updateData, config);

  return response.data;
};

// Like quiz by ID
const likeQuiz = async (quizId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + '/like/' + quizId,
    { quizId },
    config
  );

  return response.data;
};

// Unlike quiz by ID
const unlikeQuiz = async (quizId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + '/unlike/' + quizId,
    { quizId },
    config
  );

  return response.data;
};

const quizService = {
  getQuizzes,
  getQuiz,
  createQuiz,
  deleteQuiz,
  updateQuiz,
  likeQuiz,
  unlikeQuiz,
};

export default quizService;
