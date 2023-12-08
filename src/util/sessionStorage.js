import { getCookie, removeCookie } from './cookie.js';

export const getUserSession = (e) => {
  let userInfoSession = sessionStorage.getItem('userInfoSession') && getCookie('x-auth_sessionToken')
                  ? JSON.parse(sessionStorage.getItem('userInfoSession'))
                  : null;
  
  return userInfoSession;
}

export const removeUserSession = (e) => {
  removeCookie('x-auth_sessionToken');
  sessionStorage.clear();
}