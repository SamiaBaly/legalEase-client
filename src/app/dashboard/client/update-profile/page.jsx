import DashboardProfilePage from "./DashboardProfilePage";
import { getUserSession } from "@/lib/core/session";
import { getClientCompany } from "@/lib/api/companies";

const ClientPage = async () => {
  const user = await getUserSession();
  const company = await getClientCompany(user?.id);

  return (
    <DashboardProfilePage
      client={user}
      clientCompany={company}
    />
  );
};

export default ClientPage;