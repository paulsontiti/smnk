import { Card, CardContent, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ApplyForJobButton from "./ApplyForJobButton";
import AdminJobStatus, { JobStatus, getJobStatus } from "./AdminJobStatus";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import SWReportsAccordion from "../accordion/SWReportsAccordion";
import ErrorAlert from "../alerts/Error";
import { SmnkErrorBoundary } from "@/pages/_app";
import { JobDetails } from "../card/ClientJobDetailsCard";

function JobDetailsComponent({ job }: { job: any }) {
  const { user } = useSelector((state: RootState) => state.users);

  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (job && user) {
      getJobStatus(job._id, setJobStatus, setError, user._id);
    }
  }, [job, user]);

  if (error) return <ErrorAlert />;
  if (!jobStatus || !job) return <p></p>;

  return (
    <SmnkErrorBoundary>
      <Card sx={{ marginBottom: "1rem", minWidth: "100%" }}>
        <CardContent>
          <JobDetails jobId={job._id} jobStatus={jobStatus} />
        </CardContent>
        {user.type === "admin" ? (
          <>
            {job.pop && !jobStatus.isJobPaidFor && (
              <>
                <Typography>Proof of Payment</Typography>
                <Image
                  alt="Proof of payment"
                  src={`/uploads/images/pop/${job.pop}`}
                  width={300}
                  height={300}
                />
              </>
            )}
            <AdminJobStatus
              jobId={job._id}
              jobStatus={jobStatus}
              isPop={job.pop !== undefined}
            />
          </>
        ) : (
          <Box>
            {jobStatus.isPaymentApproved && !jobStatus.isJobApproved && (
              <SWReportsAccordion jobId={job._id} />
            )}
            <ApplyForJobButton job={job} />
          </Box>
        )}
      </Card>
    </SmnkErrorBoundary>
  );
}

export default JobDetailsComponent;
