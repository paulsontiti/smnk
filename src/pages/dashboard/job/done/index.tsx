import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";
import Layout from "@/components/dashboard/layout";
import JobDetailsComponent from "@/components/job/JobDetailsComponent";
import { RootState } from "@/store";
import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DoneJobsPage() {
  const [jobs, setJobs] = useState<any[]>();
  const [error, setError] = useState();
  const { _id } = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    (async () => {
      try {
        if (_id) {
          const res = await axios({
            method: "POST",
            url: `${process.env.SMNK_URL}api/job/done/${_id}`,
          });
          const data = await res.data;
          setJobs(data);
        } else {
          console.log("Invalid request");
        }
      } catch (err: any) {
        console.log(err);
        setError(err);
      }
    })();
  });

  if (error)
    return (
      <Layout>
        <ErrorAlert />
      </Layout>
    );
  if (Array.isArray(jobs) && jobs.length < 1)
    return (
      <Layout>
        <InfoAlert message="No Done Jobs" />
      </Layout>
    );

  return (
    <Layout>
      {Array.isArray(jobs) &&
        jobs.map((job) => <JobDetailsComponent key={job._id} job={job} />)}
    </Layout>
  );
}

export default DoneJobsPage;
