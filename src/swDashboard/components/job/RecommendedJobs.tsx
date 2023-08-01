import SWJobDetailsAccordion from "@/components/accordion/SWJobDetailsAccordion";
import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";
import { SmnkErrorBoundary } from "@/pages/_app";
import { RootState } from "@/store";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RecommendedJobs() {
  const {
    users: {
      user: { _id },
    },
    swExtra: {
      swExtra: { onAJob },
    },
  } = useSelector((state: RootState) => state);
  const [jobs, setJobs] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    // if (onAJob) {
    //   router.push("/dashboard/job/current");
    // }
    (async () => {
      try {
        if (_id) {
          const res = await axios({
            method: "POST",
            url: `${process.env.SMNK_URL}api/sw-dashboard/jobs/recommended-jobs`,
            data: { _id },
          });
          const data = await res.data;
          setJobs(data);
        } else {
          setError("invalid request");
        }
      } catch (err: any) {
        setError(err);
        return err;
      }
    })();
  }, [_id]);
  if (error) return <ErrorAlert message={error.toString()} />;
  if (jobs === null) return <LoadingAlert />;
  if (Array.isArray(jobs) && jobs.length === 0)
    return (
      <InfoAlert
        message=" No Recommended Jobs. Please Upgrade to a higher package or add your
    profile and services"
      />
    );

  return (
    <SmnkErrorBoundary>
      <Box>
        <Typography
          sx={{ margin: "1rem 1rem", fontWeight: "900" }}
          variant="body2"
        >
          All Jobs
        </Typography>
        {Array.isArray(jobs) &&
          jobs.map((job, i) => <SWJobDetailsAccordion key={i} job={job} />)}
      </Box>
    </SmnkErrorBoundary>
  );
}

export default RecommendedJobs;
