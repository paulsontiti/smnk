import { JobStatus } from "@/components/job/AdminJobStatus";
import { getJobDetails } from "@/lib/job";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import moment from "moment";
import Divider from '@mui/material/Divider';

function JobDetailsContent({ jobId }: { jobId: string }) {
  const [jobDetails, setJobDetails] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    getJobDetails(jobId, setJobDetails, setError);
  }, [jobId]);
  if (error) return <p>Error occurred while fetching job status</p>;
  if (!jobDetails) return <p>loading....</p>;

  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography>State</Typography>
        <Divider/>
      </Grid>
      <Grid item xs={8}>
        <Box>{jobDetails.state}</Box>
        <Divider/>
      </Grid>
      <Grid item xs={4}>
        <Typography>L.G.A</Typography>
        <Divider/>
      </Grid>
      <Grid item xs={8}>
        <Box>{jobDetails.lga}</Box>
        <Divider/>
      </Grid>
      <Divider/>
      <Grid item xs={4}>
        <Typography>Address</Typography>
        <Divider/>
      </Grid>
      <Grid item xs={8}>
        <Box>{jobDetails.address}</Box>
        <Divider/>
      </Grid>
      <Grid item xs={4}>
        <Typography>Description</Typography>
        <Divider/>
      </Grid>
      <Grid item xs={8}>
        <Box>{jobDetails.description}</Box>
        <Divider/>
      </Grid>
      <Grid item xs={4}>
        <Typography>End Date</Typography>
        
      </Grid>
      <Grid item xs={8}>
        <Box>{moment(jobDetails.endDate).format("DD/MM/YY")}</Box>
      </Grid>
    </Grid>
  );
}

export default JobDetailsContent;
