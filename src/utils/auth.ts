// src\utils\auth.ts
import Cookies from 'js-cookie'; // Client-side cookies management
import { verifyTokenForPage } from './verifyToken';

export const getAuthInfo = () => {
  const jwtToken = Cookies.get('jwtToken');
  const payload = verifyTokenForPage(jwtToken)
  if (!payload) {
    return {
      isLoggedIn: false,
    };
  }

  // Optionally decode the JWT or verify its validity here.
  // e.g., jwtDecode(jwtToken);

  return {
    isLoggedIn: true,
    fullName: payload.fullName,
    role: payload.role
  };
};