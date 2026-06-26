import { serverMutation } from "../core/sever";



export const savePayment = async (data) => {
  return serverMutation('/api/payments', data);
};