import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { Badge } from "@mui/material";
import { readCorrection } from "@/lib/report";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function SWCorrectionDetailsAccordion({
  correction,
  reportId,
  jobId,
}: {
  correction: any;
  reportId: string;
  jobId: string;
}) {
  if (!jobId || !correction || !reportId) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Accordion
        onClick={async () => {
          await readCorrection(jobId, reportId);
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Badge
              badgeContent={<EditIcon sx={{ width: "20px" }} color="warning" />}
            >
              <Typography variant="caption" component="span">
                {correction.subject}
              </Typography>
            </Badge>

            <Typography variant="caption" component="span">
              {moment(correction.date).format("DD/MM/YY")}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box>{correction.correction}</Box>
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
