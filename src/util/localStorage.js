import { getCookie, removeCookie } from './cookie.js';

export const getUser = (e) => {
  let userInfo = localStorage.getItem('userInfo') && getCookie('x-auth_token')
                  ? JSON.parse(localStorage.getItem('userInfo'))
                  : null;
  
  return userInfo;
}

export const removeUser = (e) => {
  removeCookie('x-auth_token');
  localStorage.clear();
}