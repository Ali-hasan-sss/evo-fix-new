// src\app\loading.tsx
import React from 'react'
import {Spinner} from "@nextui-org/react";
const loading = () => {
    return (
      <Spinner className='bg-gray-900 dark:bg-gray-100 w-screen h-screen absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50' label="جاري التحميل" color="primary" />
    );
}

export default loading