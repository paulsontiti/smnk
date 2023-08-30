import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge } from "@mui/material";

import ClientReportDetailsAccordion from "./ClientReportDetails";
import { SmnkErrorBoundary } from "@/pages/_app";

function ClientReportsAccordion({
  jobId,
  reports,
}: {
  jobId: string;
  reports: any[];
}) {
  if (!reports || !jobId) return <p></p>;
  const unreadReports = reports.filter((r) => r.read === false);
  return (
    <SmnkErrorBoundary>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Badge badgeContent={unreadReports.length} color="primary">
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Job Evidences
            </Typography>
          </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {reports.map((report: any, i: number) => (
            <ClientReportDetailsAccordion
              key={i}
              report={report}
              jobId={jobId}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}

export default ClientReportsAccordion;
