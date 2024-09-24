// src\components\Header\verifyLogin.tsx

import { cookies } from 'next/headers';
import Header from '@/components/Header/Header';
import { verifyTokenForPage } from '@/utils/verifyToken';

export default function ServerHeader() {
  const token = cookies().get('jwtToken')?.value || "";
  const authInfo = verifyTokenForPage(token)
  console.log('Token:', token);
  console.log('Auth Info:', authInfo); // Adjust this based on your actual cookie name   
    // return <Header {...authInfo} />;
}
