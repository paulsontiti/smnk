import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import { JobStatus } from "./AdminJobStatus";
import { SmnkErrorBoundary, theme } from "@/pages/_app";

const JobProgress = ({ jobStatus }: { jobStatus: JobStatus }) => {
  const newTheme = useTheme();
  const mediaQuery = useMediaQuery(newTheme.breakpoints.up("sm"));
  if (!jobStatus) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Box minWidth={"100%"} mt={2} mb={2}>
        {mediaQuery ? (
          <DesktopJobProgress jobStatus={jobStatus} />
        ) : (
          <MobileJobProgress jobStatus={jobStatus} />
        )}
      </Box>
    </SmnkErrorBoundary>
  );
};

export default JobProgress;

function JobprogressNumber({ number }: { number: number }) {
  return (
    <Box
      width={30}
      height={30}
      borderRadius={"50%"}
      bgcolor={theme.smnk[1200]}
      color={"white"}
      textAlign={"center"}
      fontWeight={"bold"}
      mb={1}
      ml={{ xs: 5, sm: 0 }}
    >
      {number}
    </Box>
  );
}

function JobProgressLabel({
  label,
  jobStatus,
  status,
}: {
  label: string;
  status: string;
  jobStatus: any;
}) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={{ xs: "flex-start", sm: "center" }}
      minWidth={{ xs: "50%", sm: "20%" }}
      maxWidth={{ xs: "50%", sm: "20%" }}
    >
      <Typography variant="caption">{label}</Typography>
      {jobStatus[status] ? (
        <DoneIcon color="success" />
      ) : (
        <PendingIcon color="error" />
      )}
    </Box>
  );
}
function JobProgressLine() {
  return (
    <Box
      minWidth={{ xs: 2, sm: "17%" }}
      maxWidth={{ xs: 2, sm: "17%" }}
      height={{ xs: 50, sm: 3 }}
      bgcolor={theme.smnk[1200]}
      ml={{ xs: 7, sm: 0 }}
      mb={{ xs: 1, sm: 0 }}
    ></Box>
  );
}

function DesktopJobProgress({ jobStatus }: { jobStatus: any }) {
  return (
    <Box>
      <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
        <JobprogressNumber number={1} /> <JobProgressLine />
        <JobprogressNumber number={2} /> <JobProgressLine />
        <JobprogressNumber number={3} /> <JobProgressLine />
        <JobprogressNumber number={4} /> <JobProgressLine />
        <JobprogressNumber number={5} />
      </Box>
      <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
        <JobProgressLabel
          label="Payment received"
          jobStatus={jobStatus}
          status="isPaymentApproved"
        />
        <JobProgressLabel
          label="Job commenced"
          jobStatus={jobStatus}
          status="jobCommenced"
        />
        <JobProgressLabel
          label="Job Completed"
          jobStatus={jobStatus}
          status="isJobApproved"
        />{" "}
        <JobProgressLabel
          label="Payment pending"
          jobStatus={jobStatus}
          status="isJobApproved"
        />{" "}
        <JobProgressLabel
          label="Payment withdrawn"
          jobStatus={jobStatus}
          status="swPaid"
        />
      </Box>
    </Box>
  );
}
function MobileJobProgress({ jobStatus }: { jobStatus: any }) {
  return (
    <Box>
      <JobprogressNumber number={1} />
      <JobProgressLabel
        label="Payment received"
        jobStatus={jobStatus}
        status="isPaymentApproved"
      />
      <JobProgressLine />
      <JobprogressNumber number={2} />{" "}
      <JobProgressLabel
        label="Job commenced"
        jobStatus={jobStatus}
        status="isPaymentApproved"
      />
      <JobProgressLine />
      <JobprogressNumber number={3} />{" "}
      <JobProgressLabel
        label="Job Completed"
        jobStatus={jobStatus}
        status="isJobApproved"
      />{" "}
      <JobProgressLine />
      <JobprogressNumber number={4} />{" "}
      <JobProgressLabel
        label="Payment pending"
        jobStatus={jobStatus}
        status="isJobApproved"
      />{" "}
      <JobProgressLine />
      <JobprogressNumber number={5} />{" "}
      <JobProgressLabel
        label="Payment withdrawn"
        jobStatus={jobStatus}
        status="swPaid"
      />
    </Box>
  );
}
