import SWDetailsNoCollapse from "@/components/card/SWDetailsNoCollapse";
import Layout from "@/components/dashboard/layout";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { SmnkErrorBoundary } from "../_app";

export default function Dashboard() {
  const { _id } = useSelector((state: RootState) => state.users.user);

  return (
    <SmnkErrorBoundary>
      <Layout>
        <SWDetailsNoCollapse userId={_id} forClient={false} />
      </Layout>
    </SmnkErrorBoundary>
  );
}
