import { getUserSession } from "../core/session";
import { serverFetch } from "../core/sever";


export const getClientCompany = async (clientId) => {
  return serverFetch(`/api/my/companies?clientId=${clientId}`)
} 



export const getLoggedInClientCompany = async () => { 
  const user = await getUserSession();
  return getClientCompany(user?.id);
}