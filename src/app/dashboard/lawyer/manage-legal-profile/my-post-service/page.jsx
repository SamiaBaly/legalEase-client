import { getUserSession } from "@/lib/core/session";
import MyPostService from "./MyPostService";
import { getJobsByLawyerId } from "@/lib/api/jobs";

export default async function MyPostServicePage() {
  const user = await getUserSession();
  const lawyerId = user?.id || user?._id;

  if (!lawyerId) {
   
    return <div>user session not defined</div>;
  }

  const jobs = await getJobsByLawyerId(lawyerId);
 

  return <MyPostService user={ user} initialJobs={jobs} />;
}