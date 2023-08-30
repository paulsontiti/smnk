import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge, Box, Card, CardActions, Divider, Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PendingIcon from "@mui/icons-material/Pending";

import ApplyForJobButton from "../job/ApplyForJobButton";
import ProposalDetailsAccordion from "./ProposalDetailsAccordion";
import { SmnkErrorBoundary } from "@/pages/_app";
import SWJobDetailsCard from "../card/SWJobDetailsCard";

export default function SWJobDetailsAccordion({ job }: { job: any }) {
  return (
    <SmnkErrorBoundary>
      <Card sx={{ minWidth: "98%", maxWidth: "98%" }}>
        <SWJobDetailsCard jobId={job._id} userId={job.userId} forSw={true} />
        <ProposalDetailsAccordion jobId={job._id} />
        <CardActions>
          <ApplyForJobButton job={job} />
        </CardActions>
      </Card>
    </SmnkErrorBoundary>
  );
}
