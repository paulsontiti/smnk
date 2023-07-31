import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, CardActions, Grid, Typography } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function SWExpAccordion({ exp }: { exp: any }) {
  if (!exp) return <p></p>;

  return (
    <SmnkErrorBoundary>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="caption"
              sx={{ textTransform: "capitalize", fontWeight: "bold" }}
            >
              {exp.title}
            </Typography>
            <Box>
              <DateRangeIcon />
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {moment(exp.startDate).format("DD/MM/YY")}
              </Typography>{" "}
              {"  -  "}
              {exp.onRole ? (
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", color: "green" }}
                >
                  On Role
                </Typography>
              ) : (
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  {moment(exp.endDate).format("DD/MM/YY")}
                </Typography>
              )}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="caption">Company Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{exp.company}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption">Company State</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{exp.state}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption">Company L.G.A</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{exp.lga}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption">Company Address</Typography>
            </Grid>
            <Grid item xs={8}>
              <Box>{exp.address}</Box>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption">Role Description</Typography>
            </Grid>
            <Grid item xs={8}>
              <Box>{exp.description}</Box>
            </Grid>
          </Grid>
          <CardActions></CardActions>
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
