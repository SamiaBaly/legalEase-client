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
  FaClock,
  FaArrowRight,
  FaCheckCircle,
} from 'react-icons/fa';
import { createJobs } from '@/lib/acitons/jobs';

export default function ManageLegalProfilePage({ company }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

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

  const profileStatus = company?.status || 'pending';
  const isPending = profileStatus === 'pending';

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
        }
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
        companyLogo: company?.image || company?.logo,

        status: 'pending',
        totalHires: 0,
        createdAt: new Date(),
      };

      const res = await createJobs(payload);

      if (res?.insertedId || res?.success) {
        toast.success('Profile created successfully! Waiting for admin approval.');
        setIsEditing(false);
        router.push('/dashboard/lawyer/manage-legal-profile'); // landing page route
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
    <div className="min-h-screen bg-[#05060a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {!isEditing ? (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-300">
                  <FaClock />
                  Pending Approval
                </div>

                <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  Manage your legal profile and services from one clean dashboard.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
                  Create your consultant profile, upload your photo, and submit it for admin review.
                  Once approved, your profile will be visible to clients.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsEditing(true)}
                    isDisabled={isPending}
                    startContent={<FaArrowRight size={14} />}
                    className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPending ? 'Waiting for approval' : 'Update Profile'}
                  </Button>

                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">
                    <FaCheckCircle className="text-emerald-400" />
                    Status: <span className="font-semibold text-amber-300 capitalize">{profileStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                <span className="text-lg">←</span>
              </button>
              <div>
                <h2 className="text-xl font-black tracking-wide text-white">
                  Manage Legal Profile & Services
                </h2>
                <p className="text-xs text-zinc-400">
                  Set up what legal consultancy you offer.
                </p>
              </div>
            </div>

            <Card className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* form fields same as before */}

                <Button
                  type="submit"
                  isLoading={loading}
                  startContent={!loading && <FaSave size={16} />}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-black text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                >
                  Save Profile & Services
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}