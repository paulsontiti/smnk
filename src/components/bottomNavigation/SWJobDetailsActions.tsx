import { AlertColor, Box } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/router";
import { JobStatus, getJobStatus } from "../job/AdminJobStatus";
import { useEffect, useRef, useState } from "react";
import GenericDialog from "../dialog/GenericDialog";
import ApplyFloatingActionButtons from "../fab/Apply";
import ChatFloatingActionButtons from "../fab/Chat";
import AcceptFloatingActionButtons from "../fab/Accept";
import { confirmSWPaid } from "@/lib/payment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SnackbarComponent from "../snackbar/SnackBar";
import GenericContent from "../dialog/contents/GenericContent";
import GenericActions from "../dialog/actions/GenericActions";
import RateFloatingActionButtons from "../fab/Rate";
import ClientServiceRatingContent from "../dialog/contents/ClientServiceRatingContent";

export default function SWJobDetailsActions({ jobId }: { jobId: string }) {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  //declare refs
  const snackBarRef = useRef();
  const dialogRef = useRef();
  const ratingRef = useRef();

  const confirmAction = async (confirm: boolean) => {
    if (!confirm) {
      const refState = dialogRef.current as any;
      refState.closeDialog();
    } else {
      const refState = dialogRef.current as any;
      refState.closeDialog();
      const { result, error } = await confirmSWPaid(jobId);
      if (error) {
        setMsg(error.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
      if (result.successful) {
        setMsg(result.message);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
          router.reload();
        }, 3000);
      } else {
        setMsg(result.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    }
  };
  const dialogHandler = () => {
    const refState = dialogRef.current as any;
    refState.showDialog();
  };

  useEffect(() => {
    getJobStatus(jobId, setJobStatus, setError, _id);
  }, [jobId, _id]);

  if (error) return <p></p>;
  if (!jobStatus) return <p></p>;
  return (
    <Box sx={{ width: "100%", mb: 5 }}>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <GenericDialog
        content={
          <GenericContent message="Are sure you want to withdraw payment" />
        }
        actions={<GenericActions confirmAction={confirmAction} />}
        ref={dialogRef}
      />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {jobStatus.swPaid && (
          <BottomNavigationAction label="Payment Confirmed. Well Done!!!!" />
        )}
        {!jobStatus.isProposalAccepted && !jobStatus.hasThisUserApplied && (
          <BottomNavigationAction
            label="Send Proposal"
            icon={
              <ApplyFloatingActionButtons
                handleClick={async () => {
                  router.push(`/sw-dashboard/job/${jobId}`);
                }}
              />
            }
          />
        )}
        {jobStatus.isJobApproved && !jobStatus.swRated && (
          <BottomNavigationAction
            label="Rate Our Service"
            icon={
              <RateFloatingActionButtons
                handleClick={() => {
                  const refState = ratingRef.current as any;
                  refState.showDialog();
                }}
              />
            }
          />
        )}

        {jobStatus.isJobApproved && !jobStatus.swPaid && (
          <BottomNavigationAction
            label="Withdraw Payment"
            icon={<AcceptFloatingActionButtons handleClick={dialogHandler} />}
          />
        )}

        <BottomNavigationAction
          label="Chat Admin"
          icon={
            <ChatFloatingActionButtons
              receiverId={process.env.CUSTOMER_SERVICE_ID as string}
            />
          }
        />
      </BottomNavigation>{" "}
      {jobStatus.isJobApproved && !jobStatus.swRated && (
        <GenericDialog
          ref={ratingRef}
          content={<ClientServiceRatingContent jobId={jobId} />}
          title="Rate Our Service"
        />
      )}
    </Box>
  );
}
