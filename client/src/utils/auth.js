import { jwtDecode } from 'jwt-decode'; // correct named import
export const getToken = () => localStorage.getItem('token');
export const setToken = token => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');
export const getTokenPayload = () => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};
