'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

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
            <Button
              as={Link}
              href="/"
              startContent={<FaHome size={16} />}
              className="w-full bg-[#005A5B] hover:bg-[#004445] dark:bg-[#20B2AA] dark:hover:bg-[#008B8B] dark:text-zinc-950 text-white font-bold h-11 rounded-xl transition-colors shadow-md"
            >
              Back to Home
            </Button>

            {/* GO BACK BUTTON */}
            <Button
              variant="bordered"
              onClick={() => window.history.back()}
              startContent={<FaArrowLeft size={14} />}
              className="w-full border-2 border-default-200 dark:border-zinc-700 bg-transparent text-default-700 dark:text-zinc-300 font-bold h-11 rounded-xl hover:bg-[#eeeae1]/40 dark:hover:bg-zinc-800/50 transition-colors"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
