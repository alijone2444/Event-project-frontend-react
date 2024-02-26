import axios from 'axios';

const createAuthenticatedRequest = () => {
  const token = localStorage.getItem('authToken');
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export default createAuthenticatedRequest;
