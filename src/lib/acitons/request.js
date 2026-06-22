
'use server'

import { serverMutation } from "../core/sever";

export const submitRequest = async (data) => { 
  return serverMutation('/api/requests', data)
}