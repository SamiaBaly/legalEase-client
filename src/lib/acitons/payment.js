import { serverMutation } from "../core/sever";



export const savePayment = async () => {
  return serverMutation('/api/payments');
};