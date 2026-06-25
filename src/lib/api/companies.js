import { getUserSession } from "../core/session";
import { serverFetch } from "../core/sever";


export const getClientCompany = async (clientId) => {
  return await serverFetch(`/api/my/companies?clientId=${clientId}`)
} 
export const getLawyerCompany = async (lawyerId) => {
  return await serverFetch(`/api/my/companies?lawyerId=${lawyerId}`)
} 

export const getUserCompany = async (userId) => { 
  return await serverFetch(`/api/my/companies?userId=${userId}`)
}


export const getLoggedInClientCompany = async () => { 
  const user = await getUserSession();
  return getClientCompany(user?.id);
}
export const getLoggedInLawyerCompany = async () => { 
  const user = await getUserSession();
  return getLawyerCompany(user?.id);
}
export const getLoggedInUserCompany = async () => { 
  const user = await getUserSession();
  return getUserCompany(user?.id);
}