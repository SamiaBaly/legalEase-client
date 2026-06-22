import { getUserSession } from "../core/session";
import { serverFetch } from "../core/sever";

export const getRequestByClient = async (lawyerId) => { 
  return serverFetch(`/api/my/requests?lawyerId=${lawyerId}`)
}

export const getLoggedInClientRequest = async () => { 
  const user = await getUserSession();
  return getRequestByClient(user?.id);
}