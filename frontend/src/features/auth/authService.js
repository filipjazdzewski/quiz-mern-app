import axios from 'axios';

const API_LOCALHOST_URL = import.meta.env.VITE_API;
const API_URL = `${API_LOCALHOST_URL}/api/users`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const updateUser = async (userId, updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/' + userId, updateData, config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/' + userId, config);

  return response.data;
};

const logout = () => localStorage.removeItem('user');

const authService = {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
};

export default authService;
