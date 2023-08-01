import SWDetailsNoCollapse from "@/components/card/SWDetailsNoCollapse";
import Layout from "@/components/dashboard/layout";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SmnkErrorBoundary } from "../_app";

export default function Dashboard() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();

  return (
    <SmnkErrorBoundary>
      <Layout>{/* <SWDetailsNoCollapse userId={_id} /> */}</Layout>
    </SmnkErrorBoundary>
  );
}
