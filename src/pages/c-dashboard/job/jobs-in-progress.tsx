import { Typography, Box } from "@mui/material";
import useSWR from "swr";
import { getJobsInProgressByClientId } from "@/lib/types/job";
import JobDetailsAccordion from "@/components/accordion/ClientJobDetailsAccordion";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import Layout from "@/components/dashboard/layout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import InfoAlert from "@/components/alerts/Info";

export default function JobsInProgressPage() {
  const { _id, type } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();
  useEffect(() => {
    if (!_id || type !== "client") {
      router.push("/");
    }
  }, [router, _id, type]);
  return (
    <Layout>
      <JobsInProgressComponent />
    </Layout>
  );
}

function JobsInProgressComponent() {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const { data, error } = useSWR(
    "getJobsInProgressByClientId",
    getJobsInProgressByClientId(_id)
  );
  if (error) return <ErrorAlert />;
  if (!data) return <LoadingAlert />;

  if (Array.isArray(data) && data.length === 0)
    return <InfoAlert message="No job in progress" />;
  return (
    <Box minWidth={"100%"}>
      <Typography variant="h6" sx={{ margin: "1rem 1rem" }}>
        All Jobs In Progress
      </Typography>
      {data.map((job: any) => {
        return <JobDetailsAccordion key={job._id} job={job} />;
      })}
    </Box>
  );
}
