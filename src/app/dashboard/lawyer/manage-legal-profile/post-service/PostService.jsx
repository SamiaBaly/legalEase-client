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

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const imageFile = formData.get('image');


      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      const res = await fetch(`https://api.imgbb.com/1/upload?key= ${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST',
        body: imageFormData,
      });
      const imageData = await res.json();

      if (!imageData.success) throw new Error("Image upload failed");
      const imageUrl = imageData.data.url;

     
      const servicePayload = {
        name: user?.name,
        specialization: formData.get('specialization'),
        fee: Number(formData.get('fee')),
        bio: formData.get('bio'),
        location: formData.get('location'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        availability: formData.get('availability'),
        image: imageUrl,
        email:user?.email,
        lawyerId: user?.id || user?._id,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      console.log(servicePayload, "servicePayload");
      await createJobs(servicePayload);
      toast.success('Service posted successfully!');
      router.push("/dashboard/lawyer/manage-legal-profile/my-post-service");

    } catch (error) {
      console.error(error);
      toast.error('Failed to post service: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full p-3 rounded-lg border outline-none transition-all duration-200 
    bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 
    text-zinc-900 dark:text-zinc-100 focus:border-blue-500`;

  return (
    <div className={`w-full max-w-2xl mx-auto my-8 p-6 md:p-8 rounded-xl shadow-lg border bg-white dark:bg-gray-900 border-zinc-200`}>
      <h1 className="text-2xl font-bold mb-6">Post New Service</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Specialization</label>
            <input name="specialization" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Consultation Fee ($)</label>
            <input name="fee" type="number" required className={inputClass} />
          </div>
        </div>

        {/* নতুন লেআউট: grid-cols-2 ব্যবহার করেছি যাতে জায়গা বেশি থাকে */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Location</label>
            <input name="location" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone</label>
            <input name="phone" type="tel" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Experience (Yrs)</label>
            <input name="experience" type="number" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Availability</label>
            <select name="availability" required className={inputClass}>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Lawyer Image</label>
          <input type="file" name="image" accept="image/*" required className={inputClass} />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Professional Bio</label>
          <textarea name="bio" rows={4} required className={inputClass} />
        </div>

        <button disabled={loading} type="submit" className="w-full py-3.5 rounded-lg font-bold bg-zinc-900 text-white hover:opacity-90 disabled:opacity-50">
          {loading ? 'Posting...' : 'Post Service'}
        </button>
      </form>
    </div>
  );
}