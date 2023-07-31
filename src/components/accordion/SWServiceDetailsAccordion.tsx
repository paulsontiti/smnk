import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, CardActions, Grid, Typography } from "@mui/material";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function SWServiceDetailsAccordion({
  service,
}: {
  service: any;
}) {
  if (!service) return <p></p>;

  return (
    <SmnkErrorBoundary>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography
            variant="caption"
            sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            {service.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="caption">Service Category</Typography>
            </Grid>
            <Grid item xs={8}>
              <Box>{service.category}</Box>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption">Service Description</Typography>
            </Grid>
            <Grid item xs={8}>
              <Box>{service.description}</Box>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption">SKills</Typography>
            </Grid>
            <Grid item xs={8}>
              <ol>
                {service.skills.map((skill: string, i: number) => (
                  <li key={i}>{skill}</li>
                ))}
              </ol>
            </Grid>
          </Grid>
          <CardActions></CardActions>
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
