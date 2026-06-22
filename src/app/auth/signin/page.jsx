'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { toast } from 'react-hot-toast';

import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { signIn } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';

const SignInPage = () => {
  // States for form interaction
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      
      const { data, error } = await signIn.email({
        email,
        password,
        
      });

      if (error) {
        throw new Error(error.message || 'Invalid email or password.');
      }

      toast.success('Logged in successfully!');

     router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error(error.message || 'Something went wrong.');
      console.error('Sign In Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (error) {
      toast.error('Google sign-in failed. Please try again.');
      console.error('Google Auth Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-lg bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden transition-all">
        {/* TOP BANNER */}
        <div className="bg-[#1e2d4a] dark:bg-zinc-950 text-center py-4 border-b dark:border-zinc-800">
          <h2 className="text-white text-base font-semibold tracking-wide">
            Sign in to your account
          </h2>
        </div>

        <div className="p-8 sm:p-10">
          {/* GOOGLE SIGNIN BUTTON */}
          <Button
            variant="flat"
            fullWidth
            size="lg"
            startContent={<FaGoogle className="text-danger" />}
            className="bg-[#f0ece3] dark:bg-zinc-800 text-default-900 dark:text-zinc-100 font-bold border border-default-200/50 dark:border-zinc-700/50 hover:bg-[#e6e0d3] dark:hover:bg-zinc-700 transition-colors"
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </Button>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-default-200 dark:border-zinc-800"></div>
            <span className="px-4 text-xs font-bold text-default-400 dark:text-zinc-500 tracking-wider uppercase">
              OR
            </span>
            <div className="flex-1 border-t border-default-200 dark:border-zinc-800"></div>
          </div>

          {/* SIGN IN FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            {/* EMAIL FIELD */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-black tracking-wider text-default-500 dark:text-zinc-400 uppercase">
                Email
              </label>
              <div className="relative flex items-center w-full h-11 rounded-xl border border-default-200 dark:border-zinc-700 bg-[#eeeae1]/40 dark:bg-zinc-800/50 focus-within:!border-[#005A5B] dark:focus-within:!border-[#20B2AA] overflow-hidden transition-all px-3">
                <input
                  required
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  className="w-full h-full bg-transparent text-sm text-default-900 dark:text-zinc-100 outline-none placeholder:text-default-400 dark:placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black tracking-wider text-default-500 dark:text-zinc-400 uppercase">
                  Password
                </label>
                {/* Optional: Forgot Password Link */}
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-bold text-[#005A5B] dark:text-[#20B2AA] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center w-full h-11 rounded-xl border border-default-200 dark:border-zinc-700 bg-[#eeeae1]/40 dark:bg-zinc-800/50 focus-within:!border-[#005A5B] dark:focus-within:!border-[#20B2AA] overflow-hidden transition-all pl-3 pr-10">
                <input
                  required
                  name="password"
                  placeholder="Password"
                  type={isVisible ? 'text' : 'password'}
                  className="w-full h-full bg-transparent text-sm text-default-900 dark:text-zinc-100 outline-none placeholder:text-default-400 dark:placeholder:text-zinc-500"
                />
                <button
                  className="absolute right-3 focus:outline-none text-default-400 dark:text-zinc-500 hover:text-default-600 dark:hover:text-zinc-300 flex items-center justify-center"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-4 w-full mt-4 items-center">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-[#005A5B] hover:bg-[#004445] dark:bg-[#20B2AA] dark:hover:bg-[#008B8B] dark:text-zinc-950 text-white font-bold h-12 rounded-xl transition-colors shadow-md"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* DONT HAVE AN ACCOUNT LINK */}
              <p className="text-xs font-semibold text-default-500 dark:text-zinc-400 mt-1">
                Dont have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-[#005A5B] dark:text-[#20B2AA] hover:underline font-bold pl-0.5"
                >
                  Sign in
                </Link>
              </p>
              <Link href={ `/auth/signup?redirect=${redirectTo}`}>Create a new account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
