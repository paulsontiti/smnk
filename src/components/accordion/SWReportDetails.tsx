import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import SWCorrectionDetailsAccordion from "./SWCorrectionDetails";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function SWReportDetailsAccordion({
  report,
  jobId,
}: {
  report: any;
  jobId: string;
}) {
  if (!jobId || !report) return <p></p>;
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
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <>
              <Typography variant="caption" component="span">
                {report.subject}
              </Typography>
              <Typography variant="caption" component="span">
                {moment(report.date).format("YYYY/MM/DD")}
              </Typography>
              {report.read ? (
                <MarkChatReadIcon color="success" />
              ) : (
                <MarkChatUnreadIcon color="warning" />
              )}
            </>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box>{report.report}</Box>
          {report.correction.subject && (
            <SWCorrectionDetailsAccordion
              reportId={report._id}
              jobId={jobId}
              correction={report.correction}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
