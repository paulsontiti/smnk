import SWJobDetailsAccordion from "@/components/accordion/SWJobDetailsAccordion";
import { RootState } from "@/store";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RecommendedJobs() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [jobs, setJobs] = useState<any[]>();
  useEffect(() => {
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
          console.log("Invalid request");
        }
      } catch (err: any) {
        console.log(err);
        return err;
      }
    })();
  }, [_id]);

  if (!jobs) return <p>loading......</p>;
  if (jobs && jobs.length === 0)
    return (
      <Typography sx={{ margin: "1rem 1rem" }} variant="caption" component="p">
        No Recommended Jobs. Please Upgrade to a higher package or add your
        profile and services
      </Typography>
    );

  return (
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
  );
}

export default RecommendedJobs;
