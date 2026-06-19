'use client';

import React, { useState } from 'react';
import { Button, Card } from '@heroui/react';
import { toast } from 'react-hot-toast';
import {
  FaUser,
  FaDollarSign,
  FaStethoscope,
  FaCloudUploadAlt,
  FaSave,
} from 'react-icons/fa';

export default function ManageLegalProfilePage() {
  const [profileData, setProfileData] = useState({
    name: '',
    specialization: '',
    fee: '',
    bio: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    const { name, specialization, fee, bio } = profileData;

    if (!name || !specialization || !fee || !bio) {
      return toast.error('All legal fields are required!');
    }

    setLoading(true);
    try {
      // এখানে আপনি imgBB API ব্যবহার করে ইমেজ আপলোড এবং ব্যাকএন্ডে ডাটা সেভ করার লজিক বসাবেন
      toast.success('Legal Profile & Services updated successfully!');
    } catch (error) {
      toast.error('Failed to update credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-black text-default-900 dark:text-zinc-100 uppercase tracking-wide">
          Manage Legal Profile & Services
        </h2>
        <p className="text-xs text-default-500">
          Set up what legal consultancy you offer. This reflects directly on
          your details page.
        </p>
      </div>

      <Card className="p-6 bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-md">
        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* LAWYER NAME */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
              Consultant Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-default-400">
                <FaUser size={14} />
              </span>
              <input
                type="text"
                name="name"
                placeholder="e.g. Adv. Barrister John Doe"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 placeholder-default-400 focus:outline-none focus:border-[#005A5B] dark:focus:border-[#20B2AA] transition-colors"
              />
            </div>
          </div>

          {/* SPECIALIZATION & FEE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SPECIALIZATION */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
                Specialization
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-default-400">
                  <FaStethoscope size={14} />
                </span>
                <input
                  type="text"
                  name="specialization"
                  placeholder="e.g. Criminal / Corporate Law"
                  value={profileData.specialization}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 placeholder-default-400 focus:outline-none focus:border-[#005A5B] dark:focus:border-[#20B2AA] transition-colors"
                />
              </div>
            </div>

            {/* CONSULTANCY FEE */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
                Consultancy Fee ($)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-default-400">
                  <FaDollarSign size={14} />
                </span>
                <input
                  type="number"
                  name="fee"
                  placeholder="e.g. 150"
                  value={profileData.fee}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 placeholder-default-400 focus:outline-none focus:border-[#005A5B] dark:focus:border-[#20B2AA] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* BIO / SERVICES DESCRIPTION */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
              Professional Bio & Service Details
            </label>
            <textarea
              name="bio"
              rows={4}
              placeholder="Describe your legal experience, case successes, and services provided..."
              value={profileData.bio}
              onChange={handleInputChange}
              className="w-full p-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 placeholder-default-400 focus:outline-none focus:border-[#005A5B] dark:focus:border-[#20B2AA] transition-colors resize-none"
            />
          </div>

          {/* IMAGE UPLOAD FOR IMGBB */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
              Profile / Banner Image
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
                  : 'Click to upload your legal badge or photo'}
              </p>
              <p className="text-[10px] text-default-400 mt-1">
                Ready for imgBB pipeline (JPG, PNG, WEBP)
              </p>
            </div>
          </div>

          {/* SUBMIT ACTION */}
          <Button
            type="submit"
            isLoading={loading}
            startContent={!loading && <FaSave size={16} />}
            className="w-full bg-[#005A5B] hover:bg-[#004445] dark:bg-[#20B2AA] dark:text-zinc-950 text-white font-black h-12 rounded-xl transition-colors shadow-md"
          >
            Save Profile & Services
          </Button>
        </form>
      </Card>
    </div>
  );
}
