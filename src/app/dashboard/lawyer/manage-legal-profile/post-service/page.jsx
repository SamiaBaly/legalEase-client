import React from 'react'


import PostService from './PostService';

import {  getJobsByLawyerId } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';



const PostJobPage = async () => {
  
  const user = await getUserSession()
  const company = await getJobsByLawyerId()

  
  console.log(company, "company");
  return (
    <div>
      <PostService company={company} user={user} />
    </div>
  )
}

export default PostJobPage;