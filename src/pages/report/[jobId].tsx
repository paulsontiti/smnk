import Layout from "@/components/dashboard/layout";
import JobReportForm from "@/components/report/JobReport";
import { RedirectUser } from "@/lib/utils/urls";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

function ReportPage() {
  const router = useRouter();
  const jobId = router.query.jobId as string;
  const { user } = useSelector((state: RootState) => state.users);

  return (
    <Layout>
      <JobReportForm jobId={jobId} url={RedirectUser(user)} />
    </Layout>
  );
}

export default ReportPage;
