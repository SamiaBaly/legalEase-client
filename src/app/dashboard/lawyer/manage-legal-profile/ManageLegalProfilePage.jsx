'use client';

import React, { useState } from 'react';
import { Button, Card } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { FaCloudUploadAlt, FaArrowLeft } from 'react-icons/fa';
import { createJobs } from '@/lib/acitons/jobs';

export default function ManageLegalProfilePage({ lawyer, lawyerCompany }) {
  const [company, setCompany] = useState(lawyerCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [logoUrl, setLogoUrl] = useState(lawyerCompany?.image || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: company?.name || lawyer?.name,
      specialization: formData.get("specialization"),
      fee: Number(formData.get("fee")),
      bio: formData.get("bio"),
      location: formData.get("location"),
      phone: formData.get("phone"),
      experience: formData.get("experience"),
      image: logoUrl,
      lawyerId: lawyer?.id,
      status:'pending'
    };

    const res = await createJobs(data);
    if (res?.success || res?.insertedId) {
      toast.success("Profile saved successfully!");
      setCompany(data);
      setIsEditing(false);
    }
  };

  const inputClass = "w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-500 transition";

  return (
    <div className="min-h-screen bg-[#05060a] p-4 md:p-8 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          {isEditing && (
            <button onClick={() => setIsEditing(false)} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              <FaArrowLeft />
            </button>
          )}
          <h2 className="text-2xl font-bold">{isEditing ? "Update Profile" : "Legal Profile"}</h2>
        </div>

        {isEditing ? (
          <Card className="bg-[#121212] border border-white/10 p-8 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="flex justify-center mb-4">
                <label
                  htmlFor="logo-upload"
                  className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-full cursor-pointer overflow-hidden hover:bg-white/5"
                >
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-3xl text-zinc-400" />
                      <span className="text-xs mt-2">Upload Image</span>
                    </>
                  )}
                </label>

                <input
                  id="logo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                      const res = await fetch(
                        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                        {
                          method: "POST",
                          body: formData,
                        }
                      );

                      const data = await res.json();

                      if (data.success) {
                        setLogoUrl(data.data.url);
                        toast.success("Image uploaded");
                      }
                    } catch (error) {
                      toast.error("Upload failed");
                    }
                  }}
                />
              </div>

              <input name="companyName" defaultValue={company?.name || lawyer?.name} className={`${inputClass} opacity-60 cursor-not-allowed`} readOnly />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="specialization" defaultValue={company?.specialization} placeholder="Specialization" className={inputClass} required />
                <input name="fee" type="number" defaultValue={company?.fee} placeholder="Consultation Fee" className={inputClass} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="phone" defaultValue={company?.phone} placeholder="Phone Number" className={inputClass} required />
                <input name="location" defaultValue={company?.location} placeholder="Location" className={inputClass} required />
              </div>

              <input name="experience" type="number" defaultValue={company?.experience} placeholder="Years of Experience" className={inputClass} required />
              <textarea name="bio" rows={3} defaultValue={company?.bio} placeholder="Professional Bio" className={`${inputClass} h-auto p-4`} required />

              <Button type="submit" className="w-full h-12 rounded-xl bg-cyan-600 font-bold hover:bg-cyan-700">Save Profile</Button>
            </form>
          </Card>
        ) : (
          <Card className="bg-[#121212] border border-white/10 p-12 rounded-[32px] text-center max-w-sm mx-auto shadow-2xl">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-white mb-6">No registered Profile</h3>
              <Button onClick={() => setIsEditing(true)} className="w-full bg-cyan-600 text-white font-bold h-12 rounded-2xl hover:bg-cyan-700 transition">
                Update Profile
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}