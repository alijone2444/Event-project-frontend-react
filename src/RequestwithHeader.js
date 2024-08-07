import axios from 'axios';

const createAuthenticatedRequest = () => {
  const token = localStorage.getItem('authToken');
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "ngrok-skip-browser-warning": "any",
    },
  });
};

export default createAuthenticatedRequest;
