import { serverFetch } from "../core/sever";

export const getAllPayment = () => { 
  return serverFetch('/api/payments')
}
export const getPaymentByClientEmail = (userEmail) => { 
  return serverFetch(`/api/payments?customerEmail=${userEmail}`)
}
export const getPaymentByLawyerId = (lawyerId) => { 
  return serverFetch(`/api/payments?lawyerId=${lawyerId}`)
}
export const getPaymentByClientId = (clientId) => { 
  return serverFetch(`/api/payments?clientId=${clientId}`)
}