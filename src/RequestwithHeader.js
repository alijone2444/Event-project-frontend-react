import axios from 'axios';

const createAuthenticatedRequest = () => {
  const token = localStorage.getItem('authToken');
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "ngrok-skip-browser-warning": "any",
    },
  });

  // Adding a response interceptor
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAuthenticatedRequest;
