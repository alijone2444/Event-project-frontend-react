// api.js

import axios from 'axios';
import Cookies from 'js-cookie';

const createAuthenticatedRequest = () => {
  const token = Cookies.get('authToken');

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
const AxiosUpgradedRequest = createAuthenticatedRequest();

export default AxiosUpgradedRequest;
