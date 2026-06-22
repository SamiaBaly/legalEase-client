'use server'

import { serverMutation } from "../core/sever";

export const createCompany = async (newCompanyData) => { 
  return await serverMutation('/api/companies', newCompanyData);
}















// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createCompany = async (newCompanyData) => { 
//   const res = await fetch(`${baseUrl}/api/jobs`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newCompanyData),
//   });

//   return res.json();
// }