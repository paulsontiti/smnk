import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EditFloatingActionButtons from "../fab/Edit";
import DeleteFloatingActionButtons from "../fab/Delete";
import PayFloatingActionButtons from "../fab/Pay";
import { useRouter } from "next/router";
import { JobStatus, getJobStatus } from "../job/AdminJobStatus";
import { useEffect, useRef, useState } from "react";
import RateFloatingActionButtons from "../fab/Rate";
import TipFloatingActionButtons from "../fab/Tip";
import { deleteJob } from "@/lib/job";
import GenericDialog from "../dialog/GenericDialog";
import ClientTippingContent from "../dialog/contents/ClientTippingContent";
import GenericContent from "../dialog/contents/GenericContent";
import GenericActions from "../dialog/actions/GenericActions";
import SnackbarComponent from "../snackbar/SnackBar";
import { AlertColor } from "@mui/material";

export default function ClientJobDetailsAction({ jobId }: { jobId: string }) {
  const [value, setValue] = useState(0);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const router = useRouter();
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState();

  //ref for rating dialog
  const ratingRef = useRef();
  //ref for tipping dialog
  const tippingRef = useRef();
  //declare ref for dialog
  const dialogRef = useRef();
  //declare ref for snackbar
  const snackBarRef = useRef();

  useEffect(() => {
    getJobStatus(jobId, setJobStatus, setError);
  }, [jobId]);

  if (error) return <p></p>;
  if (!jobStatus) return <p></p>;

  const confirmAction = (confirm: boolean) => {
    if (!confirm) {
      const refState = dialogRef.current as any;
      refState.closeDialog();
    } else {
      const refState = dialogRef.current as any;
      refState.closeDialog();
      (async () => {
        const deleted = await deleteJob(jobId);
        if (deleted) {
          setMsg("Job deleted successfully");
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          router.reload();
        } else {
          setMsg("An error occurred ,please try again");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      })();
    }
  };

  return (
    <Box sx={{ width: "100%" }} m={2} p={2}>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <GenericDialog
        ref={dialogRef}
        content={
          <GenericContent message="Are you sure you want to delete this job" />
        }
        actions={<GenericActions confirmAction={confirmAction} />}
      />
      <BottomNavigation
        showLabels
        value={value}
        sx={{ bgcolor: "whitesmoke" }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {!jobStatus.isProposalAccepted && (
          <BottomNavigationAction
            label="Edit Job"
            icon={
              <EditFloatingActionButtons
                handleClick={() => {
                  router.push(`/c-dashboard/job/edit-job/${jobId}`);
                }}
              />
            }
          />
        )}

        {!jobStatus.isProposalAccepted && (
          <BottomNavigationAction
            label="Delete Job"
            icon={
              <DeleteFloatingActionButtons
                handleClick={() => {
                  const refState = dialogRef.current as any;
                  refState.showDialog();
                }}
              />
            }
          />
        )}
        {!jobStatus.isJobPaidFor && jobStatus.isProposalAccepted && (
          <BottomNavigationAction
            label="Pay For This Job"
            icon={
              <PayFloatingActionButtons
                handleClick={() => {
                  router.push(`/c-dashboard/payment/${jobId}`);
                }}
              />
            }
          />
        )}
        {jobStatus.isJobApproved && !jobStatus.clientRated && (
          <BottomNavigationAction
            label="Rate Our Service"
            icon={
              <RateFloatingActionButtons
                handleClick={() => {
                  router.push(`/rating/${jobId}`);
                }}
              />
            }
          />
        )}

        {jobStatus.clientRated && (
          <BottomNavigationAction
            label="Tip Professional"
            icon={
              <TipFloatingActionButtons
                handleClick={() => {
                  const refState = tippingRef.current as any;
                  refState.showDialog();
                }}
              />
            }
          />
        )}
        {jobStatus.clientRated && (
          <GenericDialog
            ref={tippingRef}
            content={
              <ClientTippingContent
                userId={
                  jobStatus.approvedUserId ? jobStatus.approvedUserId : ""
                }
              />
            }
            title="Bank Details"
          />
        )}
      </BottomNavigation>
      {/* <pre>{JSON.stringify(jobStatus,null,4)}</pre> */}
    </Box>
  );
}
