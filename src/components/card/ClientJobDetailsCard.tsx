import Typography from "@mui/material/Typography";
import { Box, Card, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { JobStatus, getJobStatus } from "../job/AdminJobStatus";
import ErrorAlert from "../alerts/Error";
import JobProgress from "../job/JobProgress";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import { Job } from "@/lib/types/job";
import { getJobDetails } from "@/lib/job";

export default function ClientJobDetailsCard({ job }: { job: any }) {
  const { user } = useSelector((state: RootState) => state.users);

  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [error, setError] = React.useState();

  useEffect(() => {
    if (job && user) {
      getJobStatus(job._id, setJobStatus, setError, user._id);
    }
  }, [job, user]);

  if (error) return <ErrorAlert />;
  if (!jobStatus || !job) return <p></p>;

  return (
    <SmnkErrorBoundary>
      <Card sx={{ minWidth: "100%", maxWidth: "100%", mb: 5 }}>
        <JobDetails jobId={job._id} jobStatus={jobStatus} />
        <JobPaymentInfo budget={job.jobDetails.budget} />
        <Typography
          color={theme.smnk[1200]}
          variant="caption"
          fontWeight={"bold"}
        >
          {" "}
          Dispatched payments are made after a deduction of 12% administrative
          fee.{" "}
        </Typography>
      </Card>{" "}
    </SmnkErrorBoundary>
  );
}

export function JobDetails({
  jobId,
  jobStatus,
}: {
  jobStatus?: any;
  jobId: string;
}) {
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [error, setError] = useState<Job>();
  useEffect(() => {
    getJobDetails(jobId, setJob, setError);
  }, [jobId]);
  if (error) return <ErrorAlert />;
  if (!job) return <p></p>;
  return (
    <>
      <Box flexDirection={"column"} p={2} minWidth={"100%"}>
        <Typography
          variant="body2"
          color={theme.smnk[1200]}
          sx={{ fontWeight: "600", textTransform: "capitalize" }}
        >
          {`Job Title: ${job.title}`}
        </Typography>
        {jobStatus && <JobProgress jobStatus={jobStatus} />}
      </Box>{" "}
      <Divider />
      <BlackTypography label="Budget" value={`₦${job.budget}`} />
      <BlackTypography label="Mode" value={job.type} />
      <BlackTypography label="Category" value={job.category} />
      {job.type === "physical" && (
        <BlackTypography
          label="Location"
          value={`${job.address},${job.state}`}
        />
      )}
      <BlackTypography
        label="Duration"
        value={`${new Date(job.startDate as Date).toDateString()} - ${new Date(
          job.endDate as Date
        ).toDateString()}`}
      />
      <BlackDescription label="Description" description={job.description} />
    </>
  );
}

export function BlackTypography({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <>
      <Box display={"flex"}>
        <Typography
          variant="body2"
          fontWeight={"bold"}
          height={30}
          bgcolor={"whitesmoke"}
          color={theme.smnk[1200]}
          p={0.5}
          m={1}
          maxWidth={"40%"}
          minWidth={"40%"}
          borderRadius={"10%"}
        >
          {label}:
        </Typography>{" "}
        <Typography
          variant="body2"
          height={30}
          bgcolor={"whitesmoke"}
          p={0.5}
          m={1}
          maxWidth={"50%"}
          minWidth={"50%"}
          borderRadius={"10%"}
          textTransform={"capitalize"}
        >
          {value}
        </Typography>
      </Box>
      <Divider />
    </>
  );
}
export function BlackDescription({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <>
      <Box m={1} bgcolor={"whitesmoke"} p={1}>
        <Typography
          variant="body2"
          fontWeight={"bold"}
          ml={1}
          mb={1}
          color={theme.smnk[1200]}
        >
          {label}:
        </Typography>{" "}
        <Typography variant="caption">{description}</Typography>
      </Box>
      <Divider />
    </>
  );
}
export function JobPaymentInfo({ budget }: { budget: number }) {
  return (
    <Box display={"flex"} gap={2} flexDirection={{ xs: "column", md: "row" }}>
      <Box
        m={1}
        bgcolor={"whitesmoke"}
        display={"flex"}
        alignItems={"center"}
        p={0.5}
        borderRadius={"10%"}
      >
        <Typography
          variant="body2"
          fontWeight={"bold"}
          color={theme.smnk[1200]}
        >
          Payment made:
        </Typography>{" "}
        <Typography ml={4} mr={2}>{`₦${budget}`}</Typography>
      </Box>
      <Box
        m={1}
        bgcolor={"whitesmoke"}
        display={"flex"}
        alignItems={"center"}
        p={0.5}
        borderRadius={"10%"}
      >
        <Typography
          variant="body2"
          fontWeight={"bold"}
          color={theme.smnk[1200]}
        >
          Payment dispatched:
        </Typography>{" "}
        <Typography ml={4} mr={2}>{`₦${
          budget - budget * (12 / 100)
        }`}</Typography>
      </Box>
      <Divider />
    </Box>
  );
}
