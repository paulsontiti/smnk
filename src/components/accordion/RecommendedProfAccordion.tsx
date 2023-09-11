import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { SmnkErrorBoundary } from "@/pages/_app";
import { RecommendedProfessional } from "./ClientJobDetailsAccordion";

export default function RecommendedProfAccordion({ jobId }: { jobId: string }) {
  return (
    <SmnkErrorBoundary>
      <Accordion sx={{ mt: 5, mb: 5 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Recommended Professionals</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RecommendedProfessional jobId={jobId} />
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
