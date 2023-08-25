import ClientDetailsDashboard from "@/components/card/ClientDetailsDashboard";
import Layout from "@/components/dashboard/layout";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  return (
    <>
      <Layout>
        <ClientDetailsDashboard userId={_id} forSw={false} />
      </Layout>
    </>
  );
}
