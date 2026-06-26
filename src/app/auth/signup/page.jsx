import React, { Suspense } from 'react';
import Signup from './Signup';

export default function SignupPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Signup />
      </Suspense>
    </div>
  );
}