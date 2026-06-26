'use client'; 
import React, { Suspense } from 'react';
import Signin from './SignIn';

export default function SigninPage() {
  return (
    <div>
    
      <Suspense fallback={<div>Loading...</div>}>
        <Signin />
      </Suspense>
    </div>
  );
}