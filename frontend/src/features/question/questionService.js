import axios from 'axios';

const API_LOCALHOST_URL = import.meta.env.VITE_API;
const API_URL = `${API_LOCALHOST_URL}/api/questions/`;

// Create question
const createQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, questionData, config);

  return response.data;
};

// Delete question
const deleteQuestion = async (questionId, quizId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + questionId + '/' + quizId,
    config
  );

  return response.data;
};

// Update question
const updateQuestion = async (quizId, updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + questionId + '/' + quizId,
    updateData,
    config
  );

  return response.data;
};

const questionService = { createQuestion, deleteQuestion, updateQuestion };

export default questionService;
