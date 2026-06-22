'use server'

import { serverMutation } from "../core/sever";

export const createJobs = async (newJobData) => { 
  return serverMutation('/api/jobs', newJobData);
}