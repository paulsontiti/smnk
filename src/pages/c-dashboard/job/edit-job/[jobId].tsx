import EditJob from "@/c-dashboard/components/jobs/EditJob";
import Layout from "@/components/dashboard/layout";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function EditJobPage() {
  const { _id, type } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();

  const id = router.query.jobId as string;
  useEffect(() => {
    if (!_id || type !== "client") {
      router.push("/");
    }
    if (!id) {
      router.push("/c-dashboard/job");
    }
  }, [id, router, type, _id]);

  return (
    <Layout>
      <EditJob jobId={id} />
    </Layout>
  );
}

export default EditJobPage;
