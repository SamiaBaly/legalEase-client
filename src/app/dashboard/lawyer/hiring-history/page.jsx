import { getHiresByClient } from '@/lib/api/hire';
import { getUserSession } from '@/lib/core/session';
import React from 'react'

const LawyerHiringHistory = async() => {
  const user = await getUserSession()
  console.log("user", user);
  const hires = await getHiresByClient(user.id)
  console.log(hires, "hires");
  return (
    <div>
      <h1>LawyerHiringHistory: { hires.length}</h1>
    </div>
  )
}

export default LawyerHiringHistory


