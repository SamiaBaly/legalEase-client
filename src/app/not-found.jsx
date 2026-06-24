'use client';

import React from 'react';

import { Button } from '@heroui/react';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-md bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden transition-all text-center">
        {/* TOP ACCENT BANNER */}
        <div className="bg-[#1e2d4a] dark:bg-zinc-950 py-4 border-b dark:border-zinc-800">
          <h2 className="text-white text-base font-semibold tracking-wide">
            System Message
          </h2>
        </div>

        <div className="p-8 sm:p-10 flex flex-col items-center">
          {/* LARGE 404 TEXT */}
          <h1 className="text-7xl font-black tracking-tight text-[#005A5B] dark:text-[#20B2AA]">
            404
          </h1>

          <h3 className="text-xl font-bold text-default-900 dark:text-zinc-100 mt-4">
            Page Not Found
          </h3>

          <p className="text-sm font-medium text-default-500 dark:text-zinc-400 mt-2 max-w-xs">
            The page you are looking for doesn't exist or has been moved to
            another URL.
          </p>

          {/* DECORATIVE ELEMENT */}
          <div className="w-16 h-1 bg-[#cda863] dark:bg-[#d4af37] rounded-full my-6"></div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3 w-full">
            {/* GO TO HOME BUTTON */}
            <Link
  href="/"
  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#005A5B] px-4 py-3 text-white"
>
  <FaHome size={16} />
  Go Home
</Link>

            {/* GO BACK BUTTON */}
            <Link
            href={"/"}
              
             
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#091010] px-4 py-3 text-white"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
