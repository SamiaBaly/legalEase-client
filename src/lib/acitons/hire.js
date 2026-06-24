'use server'

import { serverMutation } from "../core/sever";



// create hire
export const submitHire = async (hireData) => { 
  return serverMutation('/api/hires', hireData);
};

