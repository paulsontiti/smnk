import React from "react";
import { CardActions } from "@mui/material";
import { Job } from "@/lib/types/job";
import SWJobDetailsActions from "../bottomNavigation/SWJobDetailsActions";

function ApplyForJobButton({ job }: { job: Job }) {
  return (
    <CardActions>
      <SWJobDetailsActions jobId={job._id} />
    </CardActions>
  );
}

export default ApplyForJobButton;
