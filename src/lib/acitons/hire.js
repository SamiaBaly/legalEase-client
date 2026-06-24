'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/sever";



// create hire
export const submitHire = async (hireData) => { 
  return serverMutation('/api/hires', hireData);
};

export const updateHire = async (id, data) => { 
  const result = serverMutation(`/api/hires/${id}`, data, 'PATCH');
  revalidatePath('/dashboard/lawyer/hiring-history');
  return result;
}