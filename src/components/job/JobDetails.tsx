import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Badge,
  Divider,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ApplyForJobButton from "./ApplyForJobButton";
import AdminJobStatus, { JobStatus, getJobStatus } from "./AdminJobStatus";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PendingIcon from "@mui/icons-material/Pending";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
import SWReportsAccordion from "../accordion/SWReportsAccordion";

function JobDetailsComponent({ job }: { job: any }) {
  const { user } = useSelector((state: RootState) => state.users);

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1rem 1rem",
  };

  const [jobStatus, setJobStatus] = useState<JobStatus>({
    hasUserApplied: false,
    isJobApproved: false,
    isProposalAccepted: false,
    isJobPaidFor: false,
    isJobRated: false,
  });
  const [error, setError] = useState();

  useEffect(() => {
    getJobStatus(job._id, setJobStatus, setError, user._id);
  }, [job._id, user._id]);

  if (error) return <p>Error occurred</p>;
  if (!jobStatus) return <p>loading............</p>;

  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={dividerStyle}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", textTransform: "capitalize" }}
              >
                {job.jobDetails.title}
              </Typography>
              <Badge
                badgeContent={
                  jobStatus.isJobPaidFor ? (
                    <VerifiedIcon color="success" />
                  ) : (
                    <PendingIcon color="error" />
                  )
                }
              >
                <Typography
                  variant="caption"
                  sx={{ textDecorationLine: "line-through" }}
                >
                  N
                </Typography>
                <Typography variant="caption">
                  {job.jobDetails.budget}
                </Typography>
              </Badge>
              
            </Box>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box>
              <LocationOnIcon />
              <Typography variant="caption">{job.jobDetails.type}</Typography>
            </Box>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <CategoryIcon />
              <Typography
                variant="caption"
                sx={{ textTransform: "capitalize" }}
              >
                {`  ${job.jobDetails.category}`}{" "}
              </Typography>
            </Box>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ marginBottom: "1rem" }}>
              <DescriptionIcon />
              <Typography variant="caption">
                {job.jobDetails.description}
              </Typography>
            </Box>
            <Divider />
          </Grid>
          {job.jobDetails.type === "physical" && (
            <Grid item xs={12}>
              <Box sx={{ marginBottom: "1rem" }}>
                <HomeIcon />
                <Typography variant="caption">{`${job.jobDetails.address},${job.jobDetails.lga},${job.jobDetails.state}`}</Typography>
              </Box>
              <Divider />
            </Grid>
          )}
          <Grid item xs={12} sx={dividerStyle}>
            <DateRangeIcon />
            <Typography variant="caption">
              {job.jobDetails.startDate?.toString().slice(0, 10)}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {" "}
              -{" "}
            </Typography>
            <Typography variant="caption">
              {job.jobDetails.endDate?.toString().slice(0, 10)}
            </Typography>
          </Grid>
        </Grid>
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
          {jobStatus.isJobPaidFor && !jobStatus.isJobApproved && <SWReportsAccordion reports={job.reports} jobId={job._id}/>}
          <ApplyForJobButton job={job} />
        </Box>
      ) }
    </Card>
  );
}

export default JobDetailsComponent;
