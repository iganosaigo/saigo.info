import { IToken } from '../types';

const TOKEN_KEY = 'jwt-access-token';
const EXPIRES_KEY = 'jwt-access-token-expires';

// TODO: calculate Token expires time
export function setAccessTokenToStorage({ expiresIn, accessToken }: IToken) {
  localStorage.setItem(TOKEN_KEY, accessToken);
}

export function getAccessTokenFromStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function deleteAccessTokenFromStorage() {
  localStorage.removeItem(TOKEN_KEY);
}
