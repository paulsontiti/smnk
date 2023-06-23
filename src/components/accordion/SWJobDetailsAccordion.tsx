
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Badge, Box, CardActions, Divider, Grid } from '@mui/material';
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
import { JobStatus, getJobStatus } from '../job/AdminJobStatus';
import ApplyForJobButton from '../job/ApplyForJobButton';
import ProposalDetailsAccordion from './ProposalDetailsAccordion';
import ErrorAlert from '../alerts/Error';
import LoadingAlert from '../alerts/Loading';

export default function SWJobDetailsAccordion({job}:{job:any}) {
  const { user } = useSelector((state: RootState) => state.users);
  //const router = useRouter();

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
  const [error, setError] = React.useState();

  useEffect(() => {
    getJobStatus(job._id, setJobStatus, setError, user._id);
  }, [job._id, user._id]);

  if (error) return <ErrorAlert/>
  if (!jobStatus) return <LoadingAlert/>

  return (
    
      <Accordion sx={{margin:'1rem 0.1rem'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={dividerStyle}>
              <Typography variant="body2" sx={{fontWeight:'600', textTransform: "capitalize" }}>
                {job.details.title}
              </Typography>
              <Badge
                badgeContent={
                  jobStatus.isJobPaidFor ? <VerifiedIcon color="success"/> : <PendingIcon color="error" />
                }
              >
                <Typography variant="caption" sx={{ textDecorationLine: "line-through" }}>
                  N
                </Typography>
                <Typography  variant="caption">{job.details.budget}</Typography>
              </Badge>
            </Box>
          </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
          <Grid item xs={12}>
              <Box>
                <LocationOnIcon />
                <Typography  variant="caption">{job.details.type}</Typography>
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
                  {`  ${job.details.category}`}{" "}
                </Typography>
              </Box>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ marginBottom: "1rem" }}>
              <DescriptionIcon />
              <Box>{job.details.description}</Box>
            </Box>
            <Divider />
          </Grid>
          {job.details.type === "physical" && (
            <Grid item xs={12}>
              <Box sx={{ marginBottom: "1rem" }}>
                <HomeIcon />
                <Typography  variant="caption">{`${job.details.address},${job.details.lga},${job.details.state}`}</Typography>
              </Box>
              <Divider />
            </Grid>
          )}
          <Grid item xs={12} sx={dividerStyle}>
            <DateRangeIcon />
            <Typography  variant="caption">
              {job.details.startDate?.toString().slice(0, 10)}
            </Typography>
            <Typography  variant="caption" sx={{ fontWeight: "bold" }}>
              {" "}
              -{" "}
            </Typography>
            <Typography  variant="caption">
              {job.details.endDate?.toString().slice(0, 10)}
            </Typography>
          </Grid>
        </Grid>
        <ProposalDetailsAccordion jobId={job._id}/>
        <CardActions>
        <ApplyForJobButton job={job} />
      
        </CardActions>
        </AccordionDetails>
      </Accordion>
     
  );
}