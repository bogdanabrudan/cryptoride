import axios from 'axios';

export const login = async ({ username, password, userType }) => {
  return axios.post('${process.env.REACT_APP_API_URL}/api/auth/login', {
    username,
    password,
    userType,
  });
};
