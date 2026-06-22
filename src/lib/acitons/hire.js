
'use server'

import { serverMutation } from "../core/sever";

export const submitHire = async (hireData) => { 
  return serverMutation('/api/hires', hireData);
}