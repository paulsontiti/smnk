import ClientJobDetailsAccordion from "@/components/accordion/ClientJobDetailsAccordion";
import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";
import Layout from "@/components/dashboard/layout";
import { Job } from "@/lib/types/job";
import { RootState } from "@/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

function CompletedJobsPage() {
  const { _id, type } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();
  const [completedJobs, setCompletedJobs] = useState<Job[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!_id || type !== "client") {
      router.push("/");
    }
    (async () => {
      try {
        if (_id) {
          const res = await axios({
            method: "GET",
            url: `${process.env.SMNK_URL}api/job/completed-jobs/${_id}`,
          });
          const data = await res.data;
          //console.log(data)
          setCompletedJobs(data);
        }
      } catch (err: any) {
        console.log(err);
        setError(err);
      }
    })();
  }, [_id, type, router]);

  if (error)
    <Layout>
      <ErrorAlert />
    </Layout>;
  if (!completedJobs)
    <Layout>
      <LoadingAlert />
    </Layout>;
  if (Array.isArray(completedJobs) && completedJobs.length === 0)
    return (
      <Layout>
        <InfoAlert message="No Completed Jobs" />
      </Layout>
    );
  return (
    <Layout>
      <Box minWidth={"100%"}>
        {Array.isArray(completedJobs) &&
          completedJobs.map((job, i) => (
            <ClientJobDetailsAccordion key={i} job={job} />
          ))}
      </Box>
    </Layout>
  );
}

export default CompletedJobsPage;
