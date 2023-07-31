import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge, Box, CardActions, Divider, Grid } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function SearchedJobDetailsAccordion({ job }: { job: any }) {
  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1rem 1rem",
  };
  if (!job) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Accordion
        sx={{
          maxWidth: { xs: 320, md: 350 },
          minWidth: { xs: 320, md: 350 },
          mt: "1rem",
        }}
      >
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
                <Badge>
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
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
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

          <CardActions></CardActions>
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
