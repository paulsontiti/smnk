import { AlertColor, Box, Typography } from "@mui/material";
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
import StartFloatingButton from "../fab/StartFloatingButton";
import axios from "axios";
import { isUserVerified } from "@/lib/utils/user";

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

  const confirmAction = async (confirm: boolean) => {
    if (!confirm) {
      const refState = dialogRef.current as any;
      refState.closeDialog();
      try {
        await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/job/decline`,
          data: { jobId },
        });
        router.reload();
      } catch (err: any) {
        console.log(err);
      }
    } else {
      const refState = dialogRef.current as any;
      refState.closeDialog();

      try {
        await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/job/commence`,
          data: { jobId },
        });
        router.reload();
      } catch (err: any) {
        console.log(err);
      }

      // const { result, error } = await confirmSWPaid(jobId);
      // if (error) {
      //   setMsg(error.message);
      //   setColor("error");
      //   const refState = snackBarRef.current as any;
      //   refState.handleClick();
      // }
      // if (result.successful) {
      //   setMsg(result.message);
      //   setColor("success");
      //   const refState = snackBarRef.current as any;
      //   refState.handleClick();
      //   setTimeout(() => {
      //     router.reload();
      //   }, 3000);
      // } else {
      //   setMsg(result.message);
      //   setColor("error");
      //   const refState = snackBarRef.current as any;
      //   refState.handleClick();
      // }
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
          <StartJobTandC />
          // <GenericContent message="Are sure you want to withdraw payment" />
        }
        actions={
          <GenericActions
            confirmAction={confirmAction}
            yesLabel="I Agree"
            noLabel="I Disagree"
          />
        }
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
                  const res = await isUserVerified(_id);
                  if (res.data) {
                    router.push(`/sw-dashboard/job/${jobId}`);
                  } else {
                    setMsg(
                      "You are not eligible to send proposals because you are not verified. Kindly upload your Id and do your facial capturing"
                    );
                    setColor("error");
                    const refState = snackBarRef.current as any;
                    refState.handleClick();
                    setTimeout(() => {
                      router.push("/sw-dashboard/verification/id-card");
                    }, 6000);
                  }
                }}
              />
            }
          />
        )}
        {jobStatus.isProposalAccepted &&
          jobStatus.hasThisUserApplied &&
          !jobStatus.jobCommenced && (
            <BottomNavigationAction
              label="Start Job"
              icon={<StartFloatingButton handleClick={dialogHandler} />}
            />
          )}
        {jobStatus.isJobApproved && !jobStatus.swRated && (
          <BottomNavigationAction
            label="Rate Our Service"
            icon={
              <RateFloatingActionButtons
                handleClick={() => {
                  router.push(`/rating/${jobId}`);
                  // const refState = ratingRef.current as any;
                  // refState.showDialog();
                }}
              />
            }
          />
        )}

        {jobStatus.isJobApproved && !jobStatus.swPaid && (
          <BottomNavigationAction
            label="Withdraw Payment"
            icon={
              <AcceptFloatingActionButtons
                handleClick={async () => {
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
                }}
              />
            }
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
    </Box>
  );
}

function StartJobTandC() {
  return (
    <Box justifyContent={"center"}>
      <Typography variant="h6" mb={2}>
        THINGS YOU NEED TO KNOW BEFORE YOU PROCEED
      </Typography>
      <Typography>
        You are submitting a proposal for a physical or online job, and while
        jobs are often completed without hassle, please keep these few points in
        mind:
      </Typography>
      <ol>
        <li>
          If it is a physical job, evidence of completed work is expected.
          Always ensure you keep as much evidence as possible in case of a
          dispute. This evidence can be in the form of pictures or short videos.
        </li>
        <li>
          Clients are expected to make payment before the job commences. You
          should only accept a job once a client has made payment. Do not start
          any job before receiving payment.
        </li>
        <li>
          {" "}
          You will only receive payment for a job, upon completion and
          approval by the client.
        </li>
        <li>
          {" "}
          In the event of a client&#39;s refusal to accept a completed job, SMNK
          offers mediation services as long as there is evidence of a job well
          done, and all transactions are conducted on the SMNK platform.
        </li>
        <li>
          {" "}
          Do not accept or take jobs outside the platform, as any issues that
          may arise later as a result of this will not be addressed by SMNK.
        </li>
      </ol>
      <Typography>
        Please choose physical jobs carefully and report any suspicious activity
        to the SMNK team by directly messaging an admin or sending an email to
        info@smnklimited.com. Click I AGREE to continue or I DISAGREE to decline
        the job offer.
      </Typography>
    </Box>
  );
}
