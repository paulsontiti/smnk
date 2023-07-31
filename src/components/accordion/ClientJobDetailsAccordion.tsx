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
import AdminJobStatus, { JobStatus, getJobStatus } from "../job/AdminJobStatus";
import Image from "next/image";
import ProposalsAccordion from "./ProposalsAccordion";
import { LoadingButton } from "@mui/lab";
import ClientReportsAccordion from "./ClientsReportsAccordion";
import MoneyIcon from "@mui/icons-material/Money";
import ClientJobDetailsAction from "../bottomNavigation/ClientJobDetailsAction";
import DoneIcon from "@mui/icons-material/Done";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import ErrorAlert from "../alerts/Error";
import { fetchUsers } from "@/lib/search";
import InfoAlert from "../alerts/Info";
import JobProgress from "../job/JobProgress";
import { SmnkErrorBoundary } from "@/pages/_app";
import SWDetailsDashboardCard from "../card/SWDetailsDashboardCard";

export default function ClientJobDetailsAccordion({ job }: { job: any }) {
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
    if (job && user) {
      getJobStatus(job._id, setJobStatus, setError, user._id);
    }
  }, [job, user]);

  if (error) return <ErrorAlert />;
  if (!job || !jobStatus) return <p></p>;
  return (
    <SmnkErrorBoundary>
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
                    {!jobStatus.isJobApproved && (
                      <NotStartedIcon color="error" />
                    )}
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
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "1rem 1rem",
              }}
            >
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
            <Grid item xs={12} sx={{ mt: 5, mb: 5 }}>
              <JobProgress jobStatus={jobStatus} />
            </Grid>
            {!jobStatus.isProposalAccepted && (
              <Grid item xs={12} sx={{ mt: 5, mb: 5 }}>
                <Typography>Recommended Professionals</Typography>
                <RecommendedProfessional
                  jobCategory={job.jobDetails.category}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              {!job.proposalAccepted && (
                <ProposalsAccordion
                  proposals={job.proposals.filter(
                    (pro: any) => pro.rejected === false
                  )}
                  jobId={job._id}
                />
              )}
              {!job.approved && job.reports.length > 0 && (
                <ClientReportsAccordion reports={job.reports} jobId={job._id} />
              )}
            </Grid>
          </Grid>

          <CardActions sx={{ mt: 5 }}>
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
                <ClientJobDetailsAction jobId={job._id} />
              </Box>
            )}
          </CardActions>
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
function RecommendedProfessional({ jobCategory }: { jobCategory: string }) {
  const [users, setUsers] = useState<any[] | null>(null);
  useEffect(() => {
    (async () => {
      const data = await fetchUsers(jobCategory);
      setUsers(data);
    })();
  });
  if (!jobCategory || !users) return <p></p>;
  if (users.length === 0)
    return <InfoAlert message="No recommended professionals" />;
  return (
    <SmnkErrorBoundary>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={5}
      >
        {users?.map((user: any) => (
          <SWDetailsDashboardCard key={user.userId} userId={user.userId} />
        ))}
      </Box>
    </SmnkErrorBoundary>
  );
}
