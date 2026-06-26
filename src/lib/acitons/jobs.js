'use server'

import { serverMutation } from "../core/sever";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);



export const createJobs = async (newJobData) => { 
  return serverMutation('/api/jobs', newJobData);
}



export const deleteJob = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      
      throw new Error(data.message || "Failed to delete from server");
    }

    return { success: true, ...data };
  } catch (error) {
    console.error("Delete Error:", error);
    throw error; 
  }
};

