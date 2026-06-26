import { serverFetch } from "../core/sever";

export const getPlanById = async (planId) => {
  return serverFetch(`/api/plans?plan_id=${planId}`);
}