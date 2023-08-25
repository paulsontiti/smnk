import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge } from "@mui/material";
import SWReportDetailsAccordion from "./SWReportDetails";
import AddFloatingActionButtons from "../fab/Add";
import { useRouter } from "next/router";
import { SmnkErrorBoundary } from "@/pages/_app";
import useSWR from "swr";
import { getUserReportsForJob } from "@/lib/types/job";
function SWReportsAccordion({ jobId }: { jobId: string }) {
  const router = useRouter();

  const { data, error } = useSWR("getReports", getUserReportsForJob(jobId));

  if (!data || !jobId) return <p></p>;
  const unreadReports = data.filter((r: any) => r.read === false);
  return (
    <SmnkErrorBoundary>
      <Accordion sx={{ maxWidth: "100%", minWidth: "100%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Badge badgeContent={unreadReports.length} color="primary">
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Reports
            </Typography>
          </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {data.length > 0 &&
            data.map((report: any, i: number) => (
              <SWReportDetailsAccordion key={i} report={report} jobId={jobId} />
            ))}
          <AddFloatingActionButtons
            handleClick={() => {
              router.push(`/report/${jobId}`);
            }}
          />
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}

export default SWReportsAccordion;
