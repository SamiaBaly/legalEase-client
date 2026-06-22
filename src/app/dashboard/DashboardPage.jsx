'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Avatar } from '@heroui/react';
import { useRouter } from 'next/navigation';
import {
  FaEnvelope,
  FaIdCard,
  FaUserTag,
  FaEdit,
  FaCalendarAlt,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaClock,
  FaBriefcase,
  FaDollarSign,
  FaPhone,
  FaMapMarkerAlt,
  FaRegFileAlt,
  FaEye
} from 'react-icons/fa';

export default function DashboardPage({ user }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    imageUrl: '',
    specialization: '',
    fee: '',
    experience: '',
    phone: '',
    location: '',
    availability: 'available',
    bio: '',
    status: 'pending',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        imageUrl: user.image || user.imageUrl || '',
        specialization: user.specialization || '',
        fee: user.fee || '',
        experience: user.experience || '',
        phone: user.phone || '',
        location: user.location || '',
        availability: user.availability || 'available',
        bio: user.bio || '',
        status: user.status || 'pending',
      });
    }
  }, [user]);

  if (!user)
    return (
      <div className="text-center py-12 text-default-400">
        No profile data found.
      </div>
    );

  // ডাইনামিক স্ট্যাটাস চেকার
  const accountStatus = formData.status?.toLowerCase() || 'pending';

  // ImgBB আপলোড ফাংশন
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

    const bodyData = new FormData();
    bodyData.append('image', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: bodyData,
      });
      const data = await response.json();

      if (data.success && data.data?.url) {
        const uploadedUrl = data.data.url;
        setFormData(prev => ({ ...prev, imageUrl: uploadedUrl }));
        console.log('ImgBB Upload Success URL:', uploadedUrl);
      } else {
        alert(`Upload failed: ${data.error?.message || 'Check API Key'}`);
      }
    } catch (error) {
      console.error('ImgBB Upload Error:', error);
      alert('Network error during image upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // 🟢 newData তে সব ডেটা পাস করা হচ্ছে
    const newData = {
      lawyerId: user._id || user.id,
      ...formData
    };

    console.log('Data Submitted Successfully:', newData);

    setTimeout(() => {
      alert(`Profile Updated Successfully!`);
      setIsEditing(false);
      setLoading(false);
      router.refresh();
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in p-4">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-default-900 dark:text-zinc-100">
            Welcome back, {formData.name || 'User'}!
          </h2>
          <p className="text-sm text-default-500 dark:text-zinc-400 mt-1">
            {isEditing
              ? 'Modify your profile credentials inside the fields below.'
              : 'Manage your account overview and credentials below.'}
          </p>
        </div>

        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            startContent={<FaEdit size={14} />}
            className="bg-[#005A5B] hover:bg-[#004445] dark:bg-[#20B2AA] dark:hover:bg-[#008B8B] dark:text-zinc-950 text-white font-bold rounded-xl shadow-md transition-colors"
          >
            Update Profile
          </Button>
        )}
      </div>

      {isEditing ? (
        /* ================= 📝 ফর্ম এডিট মুড ================= */
        <Card className="w-full bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-md overflow-hidden">
          <form onSubmit={handleUpdateSubmit} className="w-full">
            <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* বাম পাশের এভাটার */}
              <div className="flex flex-col items-center gap-3 min-w-[110px]">
                <Avatar className="w-[110px] h-[110px] border-2 border-default-200 rounded-2xl overflow-hidden text-3xl font-bold flex items-center justify-center bg-zinc-800">
                  {formData.imageUrl ? (
                    <Avatar.Image
                      src={formData.imageUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                  <Avatar.Fallback className="text-zinc-400 font-bold">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar.Fallback>
                </Avatar>

                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-warning-50 dark:bg-warning-950/30 text-warning border border-warning-200 dark:border-warning-900/30">
                  {uploading ? 'Uploading...' : 'Editing'}
                </span>
              </div>

              {/* ডান পাশের গ্রিড */}
              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                {/* Full Name */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaIdCard className="text-[#cda863] shrink-0" size={20} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none" />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaEnvelope className="text-[#cda863] shrink-0" size={18} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none" />
                  </div>
                </div>

                {/* Specialization */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaBriefcase className="text-[#cda863] shrink-0" size={18} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Specialization</label>
                    <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="e.g. Criminal Law" className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none" />
                  </div>
                </div>

                {/* Fee */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaDollarSign className="text-[#cda863] shrink-0" size={18} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Consultation Fee</label>
                    <input type="number" name="fee" value={formData.fee} onChange={handleInputChange} placeholder="Hourly fee amount" className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaCalendarAlt className="text-[#cda863] shrink-0" size={18} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Experience (Years)</label>
                    <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} placeholder="e.g. 5 Years" className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none" />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaPhone className="text-[#cda863] shrink-0" size={18} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Contact number" className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none" />
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaMapMarkerAlt className="text-[#cda863] shrink-0" size={18} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Location / Chamber</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Chamber location" className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none" />
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaEye className="text-[#cda863] shrink-0" size={18} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Availability Status</label>
                    <select name="availability" value={formData.availability} onChange={handleInputChange} className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none cursor-pointer dark:bg-zinc-900">
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>

                {/* Bio (Full Width) */}
                <div className="sm:col-span-2 flex items-start gap-4 p-3 rounded-xl border border-default-200 dark:border-zinc-800 bg-[#eeeae1]/10 dark:bg-zinc-800/20 focus-within:border-[#005A5B] dark:focus-within:border-[#20B2AA] transition-colors">
                  <FaRegFileAlt className="text-[#cda863] shrink-0 mt-1" size={18} />
                  <div className="w-full">
                    <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-0.5">Professional Bio</label>
                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={3} placeholder="Write something about your legal expertise..." className="w-full bg-transparent text-sm font-bold text-default-800 dark:text-zinc-200 focus:outline-none p-0 m-0 border-none resize-none" />
                  </div>
                </div>

                {/* ড্রপজোন ইমেজ আপলোডার */}
                <div className="sm:col-span-2 w-full mt-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-default-400 block mb-2">Profile Image</label>
                  <div className={`w-full p-8 border-2 border-dashed border-default-200 dark:border-zinc-800 rounded-2xl bg-content2 dark:bg-zinc-950/20 cursor-pointer hover:border-[#005A5B] dark:hover:border-[#20B2AA] transition-colors flex flex-col items-center justify-center text-center gap-3 ${uploading ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => fileInputRef.current?.click()}>
                    <FaCloudUploadAlt className="text-[#cda863]" size={32} />
                    <div>
                      <p className="text-xs font-bold text-default-700 dark:text-zinc-200">{uploading ? 'Uploading to ImgBB...' : 'Click to upload your legal badge or photo'}</p>
                      <p className="text-[10px] text-default-400 mt-1">{formData.imageUrl ? 'Image uploaded and ready! ✅' : 'Ready for imgBB pipeline (JPG, PNG, WEBP)'}</p>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </div>
                </div>

                {/* একশন বাটন */}
                <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
                  <Button size="sm" variant="light" onClick={() => setIsEditing(false)} className="font-bold text-default-400 rounded-xl">Cancel</Button>
                  <Button size="sm" type="submit" isLoading={loading || uploading} className="bg-[#005A5B] hover:bg-[#004445] text-white font-bold rounded-xl px-6 shadow-md">Save</Button>
                </div>
              </div>
            </div>
          </form>
        </Card>
      ) : (
        /* ================= 👤 ওরিজিনাল প্রোফাইল ভিউ কার্ড ================= */
        <Card className="w-full bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* বাম পাশের এভাটার ও ডাইনামিক স্ট্যাটাস ব্যাজ */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-[110px] h-[110px] border-2 border-default-200 rounded-2xl overflow-hidden text-3xl font-bold flex items-center justify-center bg-zinc-800">
                {formData.imageUrl ? (
                  <Avatar.Image src={formData.imageUrl} className="w-full h-full object-cover" />
                ) : null}
                <Avatar.Fallback className="text-zinc-400 font-bold">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                </Avatar.Fallback>
              </Avatar>

              {accountStatus === 'approved' ? (
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-success-50 dark:bg-success-950/30 text-success border border-success-200 dark:border-success-900/30">
                  <FaCheckCircle size={10} /> Approved
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-warning-50 dark:bg-warning-950/30 text-warning border border-warning-200 dark:border-warning-900/30">
                  <FaClock size={10} /> Pending
                </span>
              )}
            </div>

            {/* ডান পাশের গ্রিড ডেটা */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaIdCard className="text-[#cda863]" size={20} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Full Name</p>
                  <p className="text-sm font-bold text-default-800 dark:text-zinc-200">{formData.name || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaEnvelope className="text-[#cda863]" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Email Address</p>
                  <p className="text-sm font-bold text-default-800 dark:text-zinc-200 break-all">{formData.email || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaBriefcase className="text-[#cda863]" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Specialization</p>
                  <p className="text-sm font-bold text-default-800 dark:text-zinc-200">{formData.specialization || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaDollarSign className="text-[#cda863]" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Consultation Fee</p>
                  <p className="text-sm font-bold text-default-800 dark:text-zinc-200">{formData.fee ? `${formData.fee} / hr` : 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaCalendarAlt className="text-[#cda863]" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Experience</p>
                  <p className="text-sm font-bold text-default-800 dark:text-zinc-200">{formData.experience || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaPhone className="text-[#cda863]" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Phone Number</p>
                  <p className="text-sm font-bold text-default-800 dark:text-zinc-200">{formData.phone || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaMapMarkerAlt className="text-[#cda863]" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Location / Chamber</p>
                  <p className="text-sm font-bold text-default-800 dark:text-zinc-200">{formData.location || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaEye className="text-[#cda863]" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Availability</p>
                  <p className="text-sm font-bold text-default-800 dark:text-zinc-200 capitalize">{formData.availability}</p>
                </div>
              </div>

              {/* Professional Bio (Full Width) */}
              <div className="sm:col-span-2 flex items-start gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
                <FaRegFileAlt className="text-[#cda863] shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-default-400">Professional Bio</p>
                  <p className="text-sm font-medium text-default-700 dark:text-zinc-300 mt-1 whitespace-pre-line leading-relaxed">
                    {formData.bio || 'No biography added yet.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}