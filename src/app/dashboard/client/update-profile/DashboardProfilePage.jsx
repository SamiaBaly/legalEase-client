'use client';

import React, { useState } from 'react';
import { Button, Card } from '@heroui/react';
import { toast } from 'react-hot-toast';
import {
  FaUser,
  FaMapMarkerAlt,
  FaUserEdit,
  FaPlusCircle,
  FaAddressCard,
  FaCloudUploadAlt,
  FaSave,
  FaArrowLeft,
  FaPhone,
  FaFileAlt,
  FaEnvelope,
} from 'react-icons/fa';
import { createCompany } from '@/lib/acitons/companies';

export default function DashboardProfilePage({ client, clientCompany }) {
  const [profile, setProfile] = useState(clientCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [inputs, setInputs] = useState({
    name: clientCompany?.name || '',
    phone: clientCompany?.phone || '',
    location: clientCompany?.location || '',
    bio: clientCompany?.bio || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let finalImageUrl = profile?.image || '';

      if (imageFile) {
        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!imgbbApiKey) throw new Error('ImgBB API key missing!');

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
        if (!imgData.success) throw new Error('Image upload failed');

        finalImageUrl = imgData.data.url;
      }

      const payload = {
        name: inputs.name,
        phone: inputs.phone,
        location: inputs.location,
        bio: inputs.bio,
        image: finalImageUrl,
        clientId: client.id,
        email: client.email,
        updatedAt: new Date().toISOString(),
      };

      const dbResult = await createCompany(payload);

      if (
        dbResult &&
        (dbResult.success ||
          dbResult.insertedId ||
          dbResult.modifiedCount ||
          dbResult._id)
      ) {
        toast.success(
          profile ? 'Profile updated successfully!' : 'Profile registered successfully!'
        );
        setProfile({ ...profile, ...payload });
        setIsEditing(false);
        setImageFile(null);
      } else {
        throw new Error(dbResult?.error || 'Failed to save data to database.');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    'w-full h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/60 focus:bg-white/7 focus:ring-2 focus:ring-cyan-400/10';
  const textareaClass =
    'w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/60 focus:bg-white/7 focus:ring-2 focus:ring-cyan-400/10 resize-none';

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                <FaAddressCard />
                Client Profile
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Manage Your Company Profile
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Keep your company identity updated with a clean dashboard profile.
              </p>
            </div>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                startContent={profile ? <FaUserEdit size={16} /> : <FaPlusCircle size={16} />}
                className="h-12 rounded-2xl border border-cyan-400/20 bg-cyan-500/15 px-5 font-semibold text-cyan-200 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-500/20"
              >
                {profile ? 'Update Profile' : 'Register Profile'}
              </Button>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Name</p>
              <p className="mt-2 truncate text-sm font-semibold text-white">
                {profile?.name || 'Not set'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Location</p>
              <p className="mt-2 truncate text-sm font-semibold text-white">
                {profile?.location || 'Not set'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Status</p>
              <p className="mt-2 text-sm font-semibold text-emerald-400">
                {profile ? 'Profile Ready' : 'Setup Pending'}
              </p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                <FaArrowLeft size={14} />
              </button>
              <div>
                <h2 className="text-xl font-black tracking-wide">
                  {profile ? 'Update Profile' : 'Register Profile'}
                </h2>
                <p className="text-xs text-zinc-400">
                  Fill in your information below for database setup.
                </p>
              </div>
            </div>

            <Card className="rounded-[28px] border border-white/10 bg-white/5 p-0 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <form onSubmit={handleFormSubmit} className="space-y-6 p-6 sm:p-8">
                {profile?.image && !imageFile && (
                  <div className="flex justify-center">
                    <img
                      src={profile.image}
                      alt="Avatar"
                      className="h-24 w-24 rounded-full border border-white/10 object-cover shadow-xl shadow-black/30"
                    />
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Selma Bush"
                        value={inputs.name}
                        onChange={handleInputChange}
                        className={`${fieldClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                      <input
                        type="text"
                        name="phone"
                        required
                        placeholder="+1 (802) 845-9057"
                        value={inputs.phone}
                        onChange={handleInputChange}
                        className={`${fieldClass} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
                      Location
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                      <input
                        type="text"
                        name="location"
                        required
                        placeholder="e.g. Dhaka, Bangladesh"
                        value={inputs.location}
                        onChange={handleInputChange}
                        className={`${fieldClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
                      Email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                      <input
                        type="text"
                        value={client?.email}
                        disabled
                        className={`${fieldClass} cursor-not-allowed pl-11 text-zinc-400 opacity-80`}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-zinc-500" size={12} />
                      {profile?.location || 'Location not set'}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaPhone className="text-zinc-500" size={12} />
                      {profile?.phone || 'Phone not set'}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaEnvelope className="text-zinc-500" size={12} />
                      {client?.email}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
                    Bio Description
                  </label>
                  <div className="relative">
                    <FaFileAlt className="pointer-events-none absolute left-4 top-4 text-zinc-500" size={13} />
                    <textarea
                      name="bio"
                      rows={5}
                      required
                      placeholder="Write a brief description about yourself..."
                      value={inputs.bio}
                      onChange={handleInputChange}
                      className={`${textareaClass} pl-11`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
                    Profile Picture
                  </label>
                  <div className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center transition hover:bg-white/8">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={e => setImageFile(e.target.files[0])}
                    />
                    <FaCloudUploadAlt className="mb-3 text-zinc-400 transition group-hover:text-cyan-300" size={34} />
                    <p className="text-sm font-semibold text-zinc-300">
                      {imageFile
                        ? imageFile.name
                        : profile
                        ? 'Select a new image to replace the current one'
                        : 'Click or drop an image here'}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      JPG, PNG, WEBP recommended
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  isLoading={submitting}
                  startContent={!submitting && <FaSave size={16} />}
                  className="h-12 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                >
                  Save to Database
                </Button>
              </form>
            </Card>
          </div>
        )}

        {profile && !isEditing && (
          <Card className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border border-white/10 object-cover shadow-xl shadow-black/30"
                />
              ) : (
                <div className="grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-white/5 text-3xl font-black text-zinc-400">
                  {profile.name ? profile.name[0] : 'U'}
                </div>
              )}

              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Profile Active
                </div>
                <h3 className="mt-3 text-2xl font-black tracking-tight">
                  {profile.name || 'Anonymous User'}
                </h3>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-400">
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                    <FaMapMarkerAlt className="text-zinc-500" size={12} />
                    {profile.location || 'Location not set'}
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                    <FaPhone className="text-zinc-500" size={12} />
                    {profile.phone || 'Phone not set'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                <FaFileAlt size={11} />
                About / Bio
              </h4>
              <p className="text-sm leading-7 text-zinc-300">
                {profile.bio || 'No bio description provided.'}
              </p>
            </div>

            
          </Card>
        )}
      </div>
    </div>
  );
}