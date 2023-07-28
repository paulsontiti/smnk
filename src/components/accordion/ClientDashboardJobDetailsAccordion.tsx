import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge, Box, CardActions, Divider, Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PendingIcon from "@mui/icons-material/Pending";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import { JobStatus, getJobStatus } from "../job/AdminJobStatus";
import { LoadingButton } from "@mui/lab";
import JobProgress from "../../components/job/JobProgress";
import MoneyIcon from "@mui/icons-material/Money";
import DoneIcon from "@mui/icons-material/Done";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import ErrorAlert from "../alerts/Error";
import LoadingAlert from "../alerts/Loading";

export default function ClientDashboardJobDetailsAccordion({
  job,
}: {
  job: any;
}) {
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
    isPaymentApproved: false,
  });
  const [error, setError] = React.useState();

  useEffect(() => {
    getJobStatus(job._id, setJobStatus, setError, user._id);
  }, [job._id, user._id]);

  if (error) return <ErrorAlert />;
  if (!jobStatus) return <LoadingAlert />;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={dividerStyle}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", textTransform: "capitalize" }}
              >
                {job.jobDetails.title}
              </Typography>
              {jobStatus.isPaymentApproved &&
              jobStatus.isProposalAccepted &&
              !jobStatus.isJobApproved ? (
                <>
                  <LoadingButton
                    loading
                    loadingPosition="end"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Work in progress
                  </LoadingButton>
                </>
              ) : (
                <>
                  {!jobStatus.isJobApproved && <NotStartedIcon color="error" />}
                </>
              )}
              {jobStatus.isJobApproved && <DoneIcon color="success" />}
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            <Box>
              {" "}
              <MoneyIcon />
              <Badge
                badgeContent={
                  jobStatus.isPaymentApproved ? (
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
              <Typography
                sx={{ textOverflow: "ellipsis" }}
                variant="caption"
                component="div"
              >
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
          <Grid item xs={12} sm={6} sx={dividerStyle}>
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
          <Grid item>
            <JobProgress jobStatus={jobStatus} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
