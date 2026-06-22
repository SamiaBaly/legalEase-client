'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { 
  FaUser, FaMapMarkerAlt, FaUserEdit, FaPlusCircle, 
  FaAddressCard, FaCloudUploadAlt, FaSave, FaArrowLeft,
  FaPhone, FaFileAlt,
  FaEnvelope
} from 'react-icons/fa';
import { createCompany } from '@/lib/acitons/companies';

export default function DashboardProfilePage({ client, clientCompany}) {
  const [profile, setProfile] = useState(clientCompany);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);


  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    location: '',
    bio: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/user/profile');
        const data = await res.json();
        
        if (data && data.success && data.profile) {
          setProfile(data.profile);
        
          setInputs({
            name: data.profile.name || '',
            phone: data.profile.phone || '',
            location: data.profile.location || '',
            bio: data.profile.bio || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let finalImageUrl = profile?.image || '';

    
      if (imageFile) {
        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!imgbbApiKey) throw new Error('ImgBB API key missing!');

        const formData = new FormData();
        formData.append('image', imageFile);

        const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: 'POST',
          body: formData,
        });

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
      

      if (dbResult && (dbResult.success || dbResult.insertedId || dbResult.modifiedCount || dbResult._id)) {
        toast.success(profile ? 'Profile updated successfully!' : 'Profile registered successfully!');
        setProfile({
          ...profile,
          ...payload
        });
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

  if (loading) {
    return <div className="text-center py-12 text-zinc-400 text-sm">Loading Profile...</div>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      
      {isEditing && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <FaArrowLeft size={14} />
            </button>
            <div>
              <h2 className="text-xl font-black text-zinc-100 uppercase tracking-wide">
                {profile ? 'Update Profile' : 'Register Profile'}
              </h2>
              <p className="text-xs text-default-500">Fill in your information below for database setup.</p>
            </div>
          </div>

          <Card className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* কারেন্ট ইমেজের প্রিভিউ */}
              {profile?.image && !imageFile && (
                <div className="flex flex-col items-center justify-center pb-2">
                  <img src={profile.image} alt="Avatar" className="w-20 h-20 rounded-full object-cover border border-zinc-700 shadow-md" />
                </div>
              )}

              {/* FULL NAME */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-300">Full Name</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-zinc-500"><FaUser size={14} /></span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Selma Bush"
                    value={inputs.name}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-zinc-800 bg-transparent text-sm font-semibold text-zinc-100 focus:outline-none focus:border-[#005A5B] transition-colors"
                  />
                </div>
              </div>

              {/* PHONE NUMBER */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-300">Phone Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-zinc-500"><FaPhone size={14} /></span>
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="+1 (802) 845-9057"
                    value={inputs.phone}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-zinc-800 bg-transparent text-sm font-semibold text-zinc-100 focus:outline-none focus:border-[#005A5B] transition-colors"
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-300">Location</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-zinc-500"><FaMapMarkerAlt size={14} /></span>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Dhaka, Bangladesh"
                    value={inputs.location}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-zinc-800 bg-transparent text-sm font-semibold text-zinc-100 focus:outline-none focus:border-[#005A5B] transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-zinc-400 text-xs font-semibold">
  <div className="flex items-center gap-1">
    <FaMapMarkerAlt className="text-zinc-500" size={12} />
    <span>{profile.location || 'Location not set'}</span>
  </div>

  <div className="flex items-center gap-1">
    <FaPhone className="text-zinc-500" size={12} />
    <span>{profile.phone || 'Phone not set'}</span>
  </div>

  <div className="flex items-center gap-1">
    <FaEnvelope className="text-zinc-500" size={12} />
    <span>{client?.email}</span>
  </div>
</div>

              {/* BIO */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-300">Bio Description</label>
                <div className="relative flex items-start">
                  <textarea
                    name="bio"
                    rows={4}
                    required
                    placeholder="Write a brief description about yourself..."
                    value={inputs.bio}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl border-2 border-zinc-800 bg-transparent text-sm font-semibold text-zinc-100 focus:outline-none focus:border-[#005A5B] resize-none"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-300">Profile Picture</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center bg-zinc-950/20 relative cursor-pointer">
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setImageFile(e.target.files[0])} />
                  <FaCloudUploadAlt className="text-default-400 mb-2" size={32} />
                  <p className="text-xs font-bold text-zinc-400 text-center truncate max-w-full px-2">
                    {imageFile ? imageFile.name : (profile ? 'Select new image to change' : 'Click to upload profile image')}
                  </p>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <Button type="submit" isLoading={submitting} startContent={!submitting && <FaSave size={16} />} className="w-full bg-[#005A5B] hover:bg-[#004445] text-white font-black h-12 rounded-xl transition-colors shadow-md">
                Save to Database
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* ----------------- ভিউ ২: কোনো প্রোফাইল রেজিস্টার্ড না থাকলে (Prompt View) ----------------- */}
      {!profile && !isEditing && (
        <Card className="p-8 text-center bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-4">
          <div className="flex justify-center text-zinc-500">
            <FaAddressCard size={48} />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-zinc-100 uppercase tracking-wide">
              No Client Profile Registered
            </h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              You haven't set up your profile details yet. Please register your profile to access all features.
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            startContent={<FaPlusCircle size={16} />}
            className="bg-[#005A5B] hover:bg-[#004445] text-white font-black px-6 h-12 rounded-xl transition-colors shadow-lg"
          >
            Register Profile
          </Button>
        </Card>
      )}

      {/* ----------------- ভিউ ৩: প্রোফাইল রেজিস্টার্ড থাকলে (Details View) ----------------- */}
      {profile && !isEditing && (
        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-black text-zinc-100 uppercase tracking-wide">Account Profile</h1>
            <p className="text-xs text-default-500">Manage your profile dashboard details.</p>
          </div>

          <Card className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md space-y-5">
            {/* হেডার অ্যাভাটার ও নাম */}
            <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-zinc-800/60 pb-5">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-2xl font-bold">
                  {profile.name ? profile.name[0] : 'U'}
                </div>
              )}
              <div className="text-center sm:text-left space-y-1.5">
                <h3 className="text-lg font-black text-zinc-100">{profile.name || 'Anonymous User'}</h3>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-zinc-400 text-xs font-semibold">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-zinc-500" size={12} />
                    <span>{profile.location || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaPhone className="text-zinc-500" size={12} />
                    <span>{profile.phone || 'Phone not set'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* বায়ো ডেসক্রিপশন ডিসপ্লে */}
            <div className="bg-zinc-950/30 p-4 rounded-xl border border-zinc-800/50 space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <FaFileAlt size={11} /> About / Bio
              </h4>
              <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                {profile.bio || 'No bio description provided.'}
              </p>
            </div>

            {/* আপডেট প্রোফাইল বাটন */}
            <Button
              onClick={() => setIsEditing(true)}
              startContent={<FaUserEdit size={16} />}
              className="w-full bg-[#005A5B] hover:bg-[#004445] text-white font-black h-12 rounded-xl shadow-md transition-colors"
            >
              Update Profile
            </Button>
          </Card>
        </div>
      )}

    </div>
  );
}