import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, IconButton, Typography } from "@mui/material";
import moment from "moment";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import SWCorrectionDetailsAccordion from "./SWCorrectionDetails";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useRouter } from "next/router";

export default function SWReportDetailsAccordion({
  report,
  jobId,
  clientId,
}: {
  report: any;
  jobId: string;
  clientId?: string;
}) {
  const router = useRouter();
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
              clientId={clientId}
              reportId={report._id}
              jobId={jobId}
              correction={report.correction}
            />
          )}
          <Button
            sx={{ mt: 2, textTransform: "capitalize" }}
            variant="outlined"
            onClick={async () => {
              try {
                const res = await axios({
                  method: "POST",
                  url: `${process.env.SMNK_URL}api/report/delete-report`,
                  data: { jobId, reportId: report._id },
                });
                const data = res.data;
                if (data) {
                  router.reload();
                }
              } catch (err: any) {}
            }}
          >
            Delete Evidence
          </Button>
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
