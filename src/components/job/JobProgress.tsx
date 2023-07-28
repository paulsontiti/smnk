import React from "react";
import { Box, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import { JobStatus } from "./AdminJobStatus";

const JobProgress = ({ jobStatus }: { jobStatus: JobStatus }) => {
  if (!jobStatus) return <p></p>;
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      flexWrap={"wrap"}
      gap={1}
      mt={5}
      mb={5}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="caption">Proposal accepted</Typography>
        {jobStatus.isProposalAccepted ? (
          <DoneIcon color="success" />
        ) : (
          <PendingIcon color="error" />
        )}
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="caption">Payment made</Typography>
        {jobStatus.isJobPaidFor ? (
          <DoneIcon color="success" />
        ) : (
          <PendingIcon color="error" />
        )}
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="caption">Payment verified</Typography>
        {jobStatus.isPaymentApproved ? (
          <DoneIcon color="success" />
        ) : (
          <PendingIcon color="error" />
        )}
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="caption">Job started</Typography>
        {jobStatus.isPaymentApproved ? (
          <DoneIcon color="success" />
        ) : (
          <PendingIcon color="error" />
        )}
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="caption">Job done</Typography>
        {jobStatus.isJobApproved ? (
          <DoneIcon color="success" />
        ) : (
          <PendingIcon color="error" />
        )}
      </Box>
    </Box>
  );
};

export default JobProgress;
