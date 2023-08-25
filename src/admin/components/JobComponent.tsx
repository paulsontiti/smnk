import { Job } from "@/lib/types/job";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React from "react";
import RecommendedSWInfo from "./RecommendedSWInfo";
import JobDetails from "@/components/job/JobDetailsComponent";

function JobComponent({ job }: { job: Job }) {
  return (
    <>
      <Card sx={{ marginTop: "1rem" }}>
        <CardContent>
          <JobDetails job={job} />
          {/* <h4>Recommended Skilled Workers</h4>
            <RecommendedSWInfo job={job}/> */}
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}

export default JobComponent;
