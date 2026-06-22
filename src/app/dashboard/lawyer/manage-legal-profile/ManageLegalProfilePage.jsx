'use client';

import React, { useState } from 'react';
import { Button, Card } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  FaUser,
  FaDollarSign,
  FaStethoscope,
  FaCloudUploadAlt,
  FaSave,
} from 'react-icons/fa';
import { createJobs } from '@/lib/acitons/jobs';

export default function ManageLegalProfilePage({ company}) {
  const router = useRouter();

 
  const [inputs, setInputs] = useState({
    name: '',
    specialization: '',
    fee: '',
    bio: '',
    experience: '',
    phone: '',
    location: '',
    availability: 'available',
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!imgbbApiKey) {
      return toast.error('ImgBB API key missing!');
    }

    if (!imageFile) {
      return toast.error('Please upload a profile photo!');
    }

    setLoading(true);

    try {
     
      const formData = new FormData();
      formData.append('image', imageFile);

      const imgResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const imgData = await imgResponse.json();
      if (!imgData.success) {
        throw new Error('Image upload failed');
      }

     
      const payload = {
  ...inputs,
  fee: Number(inputs.fee),
  experience: Number(inputs.experience),
  image: imgData.data.url,

  companyId: company?._id,
        companyName: company?.name,
companyLogo:company?.image,

  status: 'pending',
  totalHires: 0,
  createdAt: new Date(),
};
      
      const res = await createJobs(payload);

      if (res?.insertedId || res?.success) {
        toast.success('Profile created successfully!');
        router.push('/dashboard/lawyer');
      } else {
        throw new Error(res?.error || 'Database operation failed.');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong.');
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
          Set up what legal consultancy you offer.
        </p>
      </div>

      <Card className="p-6 bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-md">
        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* NAME */}
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
                required
                placeholder="e.g. Adv. John Doe"
                value={inputs.name}
                onChange={handleInputChange}
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 focus:outline-none focus:border-[#005A5B] dark:focus:border-[#20B2AA] transition-colors"
              />
            </div>
          </div>

          {/* SPECIALIZATION & FEE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  required
                  placeholder="e.g. Corporate Law"
                  value={inputs.specialization}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 focus:outline-none focus:border-[#005A5B]"
                />
              </div>
            </div>

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
                  required
                  placeholder="e.g. 150"
                  value={inputs.fee}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 focus:outline-none focus:border-[#005A5B]"
                />
              </div>
            </div>
          </div>

          {/* EXPERIENCE & PHONE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
                Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                required
                placeholder="e.g. 8"
                value={inputs.experience}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 focus:outline-none focus:border-[#005A5B]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder="+8801XXXXXXXXX"
                value={inputs.phone}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 focus:outline-none focus:border-[#005A5B]"
              />
            </div>
          </div>

          {/* LOCATION & AVAILABILITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="Dhaka, Bangladesh"
                value={inputs.location}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 focus:outline-none focus:border-[#005A5B]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
                Availability
              </label>
              <select
                name="availability"
                value={inputs.availability}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 focus:outline-none focus:border-[#005A5B]"
              >
                <option value="available" className="text-zinc-900">
                  Available
                </option>
                <option value="busy" className="text-zinc-900">
                  Busy
                </option>
              </select>
            </div>
          </div>

          {/* BIO */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
              Professional Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              required
              placeholder="Describe your legal experience..."
              value={inputs.bio}
              onChange={handleInputChange}
              className="w-full p-4 rounded-xl border-2 border-default-200 dark:border-zinc-800 bg-transparent text-sm font-semibold text-default-900 dark:text-zinc-100 focus:outline-none focus:border-[#005A5B] resize-none"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-default-700 dark:text-zinc-300">
              Profile Photo
            </label>
            <div className="border-2 border-dashed border-default-300 dark:border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center bg-[#eeeae1]/10 dark:bg-zinc-950/20 relative cursor-pointer">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={e => setImageFile(e.target.files[0])}
              />
              <FaCloudUploadAlt className="text-default-400 mb-2" size={32} />
              <p className="text-xs font-bold text-default-600 dark:text-zinc-400 text-center truncate max-w-full px-2">
                {imageFile ? imageFile.name : 'Click to upload your profile image'}
              </p>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            isLoading={loading}
            startContent={!loading && <FaSave size={16} />}
            className="w-full bg-[#005A5B] hover:bg-[#004445] dark:bg-[#20B2AA] dark:text-zinc-950 text-white font-black h-12 rounded-xl shadow-md transition-colors"
          >
            Save Profile & Services
          </Button>
        </form>
      </Card>
    </div>
  );
}