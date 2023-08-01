import ClientJobsComponent from "@/c-dashboard/components/jobs";
import Layout from "@/components/dashboard/layout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/store";

export default function JobPage() {
  const { _id, type } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();
  useEffect(() => {
    if (!_id || type !== "client") {
      router.push("/");
    }
  }, [router, _id, type]);
  return (
    <Layout>
      <ClientJobsComponent />
    </Layout>
  );
}
