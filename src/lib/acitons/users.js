'use server'

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";



export const updateUserRole = async (userId, role) => {
  const data = await auth.api.setRole({
    body: {
      userId,
      role
    },
    
    headers: await headers(),
  });
  console.log(userId, role, "userId and userRole");

  revalidatePath("/dashboard/admin/manage-users")
  
  return data;
}