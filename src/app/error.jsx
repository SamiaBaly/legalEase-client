'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FaHome, FaSyncAlt } from 'react-icons/fa';

const ErrorPage = ({ error, reset }) => {
  useEffect(() => {
    
    console.error('Application Error Captured:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-md bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden transition-all text-center">
        {/* TOP ACCENT BANNER (RED SHADE FOR ERROR) */}
        <div className="bg-danger-900/20 dark:bg-danger-950/40 py-4 border-b border-danger-200 dark:border-danger-900/30">
          <h2 className="text-danger dark:text-danger-400 text-base font-bold tracking-wide uppercase">
            Application Error
          </h2>
        </div>

        <div className="p-8 sm:p-10 flex flex-col items-center">
          {/* ERROR ALERT ICON OR TEXT */}
          <h1 className="text-6xl font-black tracking-tight text-danger">
            Oops!
          </h1>

          <h3 className="text-xl font-bold text-default-900 dark:text-zinc-100 mt-4">
            Something went wrong
          </h3>

          {/* DYNAMIC ERROR MESSAGE */}
          <p className="text-xs font-mono p-3 bg-default-100 dark:bg-zinc-800/60 rounded-xl text-default-600 dark:text-zinc-400 mt-4 w-full break-words max-h-24 overflow-y-auto border border-default-200/50 dark:border-zinc-700/30">
            {error?.message || 'An unexpected runtime error occurred.'}
          </p>

          {/* DECORATIVE ELEMENT */}
          <div className="w-16 h-1 bg-[#cda863] dark:bg-[#d4af37] rounded-full my-6"></div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3 w-full">
            {/* TRY AGAIN BUTTON */}
            <Button
              onClick={() => reset()} // এই ফাংশনটি পেজটিকে আবার রিকভার করার চেষ্টা করবে
              startContent={<FaSyncAlt size={14} />}
              className="w-full bg-[#005A5B] hover:bg-[#004445] dark:bg-[#20B2AA] dark:hover:bg-[#008B8B] dark:text-zinc-950 text-white font-bold h-11 rounded-xl transition-colors shadow-md"
            >
              Try Again
            </Button>

            {/* GO TO HOME BUTTON */}
            <Button
              as={Link}
              href="/"
              variant="bordered"
              startContent={<FaHome size={16} />}
              className="w-full border-2 border-default-200 dark:border-zinc-700 bg-transparent text-default-700 dark:text-zinc-300 font-bold h-11 rounded-xl hover:bg-[#eeeae1]/40 dark:hover:bg-zinc-800/50 transition-colors"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
