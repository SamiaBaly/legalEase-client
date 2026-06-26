import DashboardProfilePage from "./DashboardProfilePage";
import { getUserSession } from "@/lib/core/session";
import { getClientCompany } from "@/lib/api/companies";

const ClientPage = async () => {
  const user = await getUserSession();
  console.log("user by client", user);
  const company = await getClientCompany(user?.id);
  console.log("company by client", company);

  return (
    <DashboardProfilePage
      client={user}
      clientCompany={company}
    />
  );
};

export default ClientPage;