import { getUserSession } from "../core/session";
import { serverFetch } from "../core/sever";

// GET ALL COMMENTS
export const getComments = async (data) => {
 return serverFetch("/api/comments", data);
 
};

// GET BY HIRE ID
export const getCommentsByHire = async (hireId) => {
  return serverFetch(`/api/comments?hireId=${hireId}`);
};



// logged in user comments
export const getLoggedInClientComment = async () => {
  const user = await getUserSession();

  if (!user?.id) return [];

  return serverFetch(`/api/comments?clientId=${user.id}`);
};