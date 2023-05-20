import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EditFloatingActionButtons from "../fab/Edit";
import DeleteFloatingActionButtons from "../fab/Delete";
import PayFloatingActionButtons from "../fab/Pay";
import { useRouter } from "next/router";
import { JobStatus, getJobStatus } from "../job/AdminJobStatus";
import { useEffect, useRef, useState } from "react";
import { cancelJob } from "@/lib/job";
import GenericDialog from "../dialog/GenericDialog";
import ClientTippingContent from "../dialog/contents/ClientTippingContent";
import ApplyFloatingActionButtons from "../fab/Apply";
import CancelFloatingActionButtons from "../fab/Cancel";
import ChatFloatingActionButtons from "../fab/Chat";
import AcceptFloatingActionButtons from "../fab/Accept";
import { confirmSWPaid } from "@/lib/payment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function SWJobDetailsActions({ jobId }: { jobId: string }) {
    const {_id} = useSelector((state:RootState)=>state.users.user)
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
    getJobStatus(jobId, setJobStatus, setError,_id);
  }, [jobId,_id]);

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
         {jobStatus.swPaid && (
            <BottomNavigationAction
            label="Payment Confirmed. Well Done!!!!"
          />
     
      )}
      {!jobStatus.isProposalAccepted &&
        !jobStatus.hasThisUserApplied && (
            <BottomNavigationAction
            label="Apply"
            icon={
              <ApplyFloatingActionButtons
                handleClick={async () => {
                    router.push(`/sw-dashboard/job/${jobId}`);
                }}
              />
            }
          />
         
        )}

{jobStatus.isProposalAccepted && !jobStatus.isJobPaidFor &&
        jobStatus.hasThisUserApplied && (
            <BottomNavigationAction
            label="Cancel"
            icon={
              <CancelFloatingActionButtons
                handleClick={async() => {
                    const result  = await cancelJob(jobId)
                    if(result){
                      alert('Job cancelled')
                      router.push(`/dashboard/job/recommended-jobs`);
                    }else{
                      alert('An error occurred,try again')
                    }
                  }}
              />
            }
          />
        )}
       {jobStatus.isJobApproved && !jobStatus.swPaid && (
       <BottomNavigationAction
            label="Confirm Payment"
            icon={
              <AcceptFloatingActionButtons
                handleClick={async () => {
                    const confirmed = await confirmSWPaid(jobId);
                    if (confirmed) {
                      alert("Payment confirmed");
                      router.push("/dashboard/job/done");
                    }
                  }
                }
              />
            }
          />
         
      )}
        {jobStatus.isJobApproved && !jobStatus.swPaid && (
        
        <BottomNavigationAction
        label="Message Admin"
        icon={
          <ChatFloatingActionButtons
            handleClick={() => {
                router.push(`/report/${jobId}`);
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
