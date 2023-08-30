import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  CardActions,
  Typography,
  AlertColor,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import ClientReportAction from "../bottomNavigation/ClientReportAction";
import DownloadFileBottomNavigation from "../bottomNavigation/DownloadFileBottomNavigation";
import { readReport } from "@/lib/report";
import SnackbarComponent from "../snackbar/SnackBar";
import { useRef, useState } from "react";
import GenericDialog from "../dialog/GenericDialog";
import GenericContent from "../dialog/contents/GenericContent";
import GenericActions from "../dialog/actions/GenericActions";
import FileReaderCard from "../card/FileReaderCard";
import { SmnkErrorBoundary } from "@/pages/_app";

//download report handler
export const downloadReport = (url: string) => {
  // using Java Script method to get PDF file
  fetch(url).then((response) => {
    response.blob().then((blob) => {
      // Creating new object of PDF file
      const fileURL = window.URL.createObjectURL(blob);
      // Setting various property values
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = url;
      alink.click();
    });
  });
};

export default function ClientReportDetailsAccordion({
  report,
  jobId,
}: {
  report: any;
  jobId: string;
}) {
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  //declare refs
  const snackBarRef = useRef();
  const dialogRef = useRef();
  const readFileDialogRef = useRef();

  //accept report handler
  async function approveJob() {
    if (jobId) {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/c-dashboard/job/approve-job`,
          data: { jobId },
        });
        const data = await res.data;

        if (data.successful) {
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();

          setTimeout(() => {
            router.reload();
          }, 6000);
        } else {
          setMsg(data.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      } catch (err: any) {
        setMsg(
          "An error occurred. Please try again or contact customer service"
        );
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        return err;
      }
    } else {
      alert("invalid request");
    }
  }

  const router = useRouter();
  const confirmAction = (confirm: boolean) => {
    if (!confirm) {
      const refState = dialogRef.current as any;
      refState.closeDialog();
    } else {
      const refState = dialogRef.current as any;
      refState.closeDialog();
      approveJob();
    }
  };
  const dialogHandler = () => {
    const refState = dialogRef.current as any;
    refState.showDialog();
  };

  const readFileDialogHandler = () => {
    const refState = readFileDialogRef.current as any;
    refState.showDialog();
  };
  if (!report || !jobId) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Accordion
        onClick={async () => {
          await readReport(jobId, report._id);
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
            <Typography
              variant="caption"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              {report.subject}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              {moment(report.date).format("YYYY/MM/DD")}
            </Typography>
            {report.read ? (
              <MarkChatReadIcon color="success" />
            ) : (
              <MarkChatUnreadIcon color="warning" />
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <GenericDialog
            content={
              <GenericContent message="Are you sure you want to approve this job?" />
            }
            actions={<GenericActions confirmAction={confirmAction} />}
            ref={dialogRef}
          />
          <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
          <Typography sx={{ fontWeight: "bold", margin: "1rem 0" }}>
            Job Evidence:
          </Typography>
          <Box sx={{ marginBottom: "1rem" }}>{report.report}</Box>
          {report.file.name && (
            <>
              <Typography sx={{ fontWeight: "bold", margin: "1rem 0" }}>
                Attached file:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
                p={1}
              >
                <Typography sx={{ marginBottom: "1rem" }}>
                  {report.file.name}
                </Typography>
                <DownloadFileBottomNavigation
                  handleDownloadClick={() =>
                    downloadReport(`/api/multer/reports/${report.file.name}`)
                  }
                />{" "}
                <Button onClick={readFileDialogHandler}>View File</Button>
              </Box>
              <GenericDialog
                title=""
                content={
                  <FileReaderCard
                    filename={report.file.name}
                    contentType={report.file.contentType ?? ""}
                  />
                }
                actions={<p></p>}
                ref={readFileDialogRef}
              />
            </>
          )}
          {report.correction.subject && (
            <>
              <Typography
                variant="caption"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Corection{" "}
              </Typography>
              {report.correction.read ? (
                <MarkChatReadIcon color="success" />
              ) : (
                <MarkChatUnreadIcon color="warning" />
              )}
            </>
          )}
          {!report.correction.subject && (
            <CardActions>
              <ClientReportAction
                handleApproveClick={dialogHandler}
                handleComplainClick={() => {
                  router.push(`/report/complaint/${jobId}`);
                }}
                handleCorrectionClick={() => {
                  router.push(`/report/corrections/${jobId}-${report._id}`);
                }}
              />
            </CardActions>
          )}
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
