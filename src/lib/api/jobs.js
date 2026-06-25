import { getUserSession } from "../core/session";
import { serverFetch } from "../core/sever";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async () => { 
  return serverFetch('/api/jobs')
}

export const getJobById = async (id) => { 
  return serverFetch(`/api/jobs/${id}`)
}




export const getCompanyJobs = async (companyId) => { 
  const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}`)
  return res.json();
}
export const getJobsByLawyerId = async (lawyerId) => { 
  return serverFetch(`/api/jobs?lawyerId=${lawyerId}`)
 
}

export const getLoggedInJobsLawyer = async () => {
  const user = await getUserSession();
  if (!user?.id) return [];

  return getJobsByLawyerId(user.id);
};


// export const getLawyer = async (lawyerId, status = 'active') => { 
//   const res = await fetch(`${baseUrl}/api/lawyers?lawyerId=${lawyerId}&status=${status}`);
//   return await res.json();
// }