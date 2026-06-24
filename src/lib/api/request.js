import { getUserSession } from "../core/session";
import { serverFetch } from "../core/sever";

export const getRequestByClient = async (lawyerId) => { 
  return serverFetch(`/api/my/requests?lawyerId=${lawyerId}`)
}

export const getRequestById = async (id) => {
  return serverFetch(`/api/my/requests/${id}`);
};

export const getLoggedInClientRequest = async () => { 
  const user = await getUserSession();
  return getRequestByClient(user?.id);
}