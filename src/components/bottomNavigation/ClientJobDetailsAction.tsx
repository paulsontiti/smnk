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
import ClientServiceRatingContent from "../dialog/contents/ClientServiceRatingContent";
import ClientTippingContent from "../dialog/contents/ClientTippingContent";

export default function ClientJobDetailsAction({ jobId }: { jobId: string }) {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [jobStatus, setJobStatus] = useState<JobStatus>({
    hasUserApplied: false,
    isJobApproved: false,
    isProposalAccepted: false,
    isJobPaidFor: false,
    isJobRated: false,
  });
  const [error, setError] = useState();

  //ref for rating dialog
  const ratingRef = useRef();
    //ref for tipping dialog
    const tippingRef = useRef();

  useEffect(() => {
    getJobStatus(jobId, setJobStatus, setError);
  }, [jobId]);

  if (error) return <p></p>;
  if (!jobStatus) return <p></p>;

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {!jobStatus.isJobPaidFor && !jobStatus.isProposalAccepted && (
          <BottomNavigationAction
            label="Edit"
            icon={
              <EditFloatingActionButtons
                handleClick={() => {
                  router.push(`/c-dashboard/job/edit-job/${jobId}`);
                }}
              />
            }
          />
        )}

        {!jobStatus.isJobPaidFor && !jobStatus.isProposalAccepted && (
          <BottomNavigationAction
            label="Delete"
            icon={
              <DeleteFloatingActionButtons
                handleClick={async () => {
                  if (confirm("Are you sure you want to deete this job")) {
                    const deleted = await deleteJob(jobId);
                    if (deleted) {
                      alert("Job Deleted");
                    } else {
                      alert("An Error occured, please try again");
                    }
                  }
                }}
              />
            }
          />
        )}
        {!jobStatus.isJobPaidFor && jobStatus.isProposalAccepted && (
          <BottomNavigationAction
            label="Pay"
            icon={
              <PayFloatingActionButtons
                handleClick={() => {
                  router.push(`/c-dashboard/payment/${jobId}`);
                }}
              />
            }
          />
        )}
        {jobStatus.isJobApproved && !jobStatus.isJobRated && (
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
        {jobStatus.isJobApproved && !jobStatus.isJobRated && (
          <GenericDialog
            ref={ratingRef}
            content={<ClientServiceRatingContent jobId={jobId} />}
            title="Rate Our Service"
          />
        )}
        {jobStatus.isJobRated && (
          <BottomNavigationAction
            label="Tip S.W"
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
        {jobStatus.isJobRated && (
          <GenericDialog
            ref={tippingRef}
            content={
              <ClientTippingContent
                userId={
                  jobStatus.approvedUserId ? jobStatus.approvedUserId : ""
                }
              />
            }
            title="Buy Skiilled Worker a cup of coffee"
          />
        )}
      </BottomNavigation>
      {/* <pre>{JSON.stringify(jobStatus,null,4)}</pre> */}
    </Box>
  );
}
