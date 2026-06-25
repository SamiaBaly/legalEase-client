'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJobs } from '@/lib/acitons/jobs';
import { toast } from 'react-hot-toast';

export default function PostServiceForm({ company, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const servicePayload = {
        name: user?.name,
        specialization: formData.get('specialization'),
        fee: Number(formData.get('fee')),
        bio: formData.get('bio'),
        location: formData.get('location'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        image: company?.image || "",
        lawyerId: user?.id || user?._id,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      await createJobs(servicePayload);
      toast.success('Service posted successfully!');
      router.push("/dashboard/lawyer/manage-legal-profile/my-post-service")
    } catch (error) {
      toast.error('Failed to post service');
    } finally {
      setLoading(false);
    }
  };

  // Template literal ব্যবহার করা হয়েছে যা সঠিক পদ্ধতি
  const inputClass = `w-full p-3 rounded-lg border outline-none transition-all duration-200 
    bg-white dark:bg-zinc-950 
    border-zinc-300 dark:border-zinc-800 
    text-zinc-900 dark:text-zinc-100 
    focus:border-blue-500 dark:focus:border-blue-500`;

  return (
    <div className={`w-full max-w-2xl mx-auto my-8 p-6 md:p-8 rounded-xl shadow-lg border 
         bg-white dark:bg-gray-900 border-zinc-200 dark:border-zinc-800`}>

      <h1 className="text-2xl font-bold mb-1 text-zinc-900 dark:text-white">Post New Service</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">Create a new legal service.</p>

      <div className="mb-6 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        <p className="text-xs uppercase tracking-wider text-zinc-500">Service Provider</p>
        <p className="font-medium text-zinc-900 dark:text-white mt-1">{user?.name || "N/A"}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Specialization</label>
            <input name="specialization" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Consultation Fee ($)</label>
            <input name="fee" type="number" required className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Location</label>
            <input name="location" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Phone</label>
            <input name="phone" type="tel" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Experience (Yrs)</label>
            <input name="experience" type="number" required className={inputClass} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Professional Bio</label>
          <textarea name="bio" rows={4} required className={inputClass} />
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`w-full py-3.5 rounded-lg font-bold transition-all 
          bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 disabled:opacity-50`}
        >
          {loading ? 'Posting...' : 'Post Service'}
        </button>
      </form>
    </div>
  );
}