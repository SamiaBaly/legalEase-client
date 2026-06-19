'use client';

import React, { useState } from 'react';
import { Button, Card } from '@heroui/react'; // Input ইম্পোর্ট থেকে বাদ দেওয়া হয়েছে এরর এড়াতে
import { toast } from 'react-hot-toast';
import { FaUser, FaCloudUploadAlt } from 'react-icons/fa';

export default function UpdateProfilePage() {
  const [fullName, setFullName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!fullName) return toast.error('Full name is required');

    setLoading(true);
    try {
      // ব্যাকএন্ড API বা Better Auth আপডেট লজিক এখানে হবে
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-black text-default-900 dark:text-zinc-100 uppercase tracking-wide">
          Update Profile
        </h2>
        <p className="text-xs text-default-500">
          Update your account identity and display photo.
        </p>
      </div>

      <Card className="p-6 bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* SAFE TAILWIND FULL NAME INPUT (No startContent Error) */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-default-400">
                <FaUser size={16} />
              </span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 placeholder-default-400 focus:outline-none focus:border-[#005A5B] dark:focus:border-[#20B2AA] transition-colors"
              />
            </div>
          </div>

          {/* PROFILE PICTURE UPLOAD */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
              Profile Picture
            </label>
            <div className="border-2 border-dashed border-default-300 dark:border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center bg-[#eeeae1]/10 dark:bg-zinc-950/20 hover:bg-[#eeeae1]/20 transition-colors relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={e => setImageFile(e.target.files[0])}
              />
              <FaCloudUploadAlt className="text-default-400 mb-2" size={32} />
              <p className="text-xs font-bold text-default-600 dark:text-zinc-400">
                {imageFile
                  ? imageFile.name
                  : 'Click or Drag image here to upload'}
              </p>
              <p className="text-[10px] text-default-400 mt-1">
                Supports JPG, PNG, WEBP
              </p>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-[#005A5B] hover:bg-[#004445] dark:bg-[#20B2AA] dark:text-zinc-950 text-white font-black h-12 rounded-xl transition-colors shadow-md"
          >
            Save Updates
          </Button>
        </form>
      </Card>
    </div>
  );
}
