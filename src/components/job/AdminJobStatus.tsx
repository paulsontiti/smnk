import { confirmJobPayment } from "@/lib/payment";
import { LoadingButton } from "@mui/lab";
import { Button, CardActions } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export type JobStatus = {
  hasUserApplied: boolean;
  isJobApproved: boolean;
  isProposalAccepted: boolean;
  isJobPaidFor: boolean;
  isJobRated?: boolean;
  approvedUserId?: string;
  hasThisUserApplied?: boolean;
  swPaid?: boolean;
};

export const getJobStatus = async (
  jobId: string,
  setStatus: React.Dispatch<React.SetStateAction<JobStatus>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  userId?: string
) => {
  try {
    if (jobId) {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/job/get-job-status`,
        data: { jobId, userId },
      });
      const data = await res.data;
      //console.log(data)
      setStatus(data);
    }
  } catch (err: any) {
    console.log(err);
    setError(err);
  }
};
function AdminJobStatus({
  jobId,
  jobStatus,
  isPop,
}: {
  jobId: string;
  jobStatus: JobStatus;
  isPop: boolean;
}) {
  const router = useRouter();

  const [confirmPaymentLoading, setConfirmPaymentLoading] = useState(false);

  return (
    <>
      {!jobStatus.isJobPaidFor && isPop && (
        <CardActions>
          <LoadingButton
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            size="small"
            loading={confirmPaymentLoading}
            onClick={async () => {
              if (confirm("Are you sure you want to confirm this payment?")) {
                setConfirmPaymentLoading(true);
                const confirmed = await confirmJobPayment(jobId);
                if (confirmed) {
                  setConfirmPaymentLoading(false);
                  alert("Payment confirmed");
                  router.push("/a-dashboard");
                } else {
                  setConfirmPaymentLoading(false);
                  alert("payment not confirmed");
                }
              }
            }}
          >
            Confirm Payment
          </LoadingButton>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="outlined"
            size="small"
            onClick={async () => {}}
          >
            Message Payer
          </Button>
        </CardActions>
      )}
      <pre>{JSON.stringify(jobStatus, null, 4)}</pre>
    </>
  );
}

export default AdminJobStatus;
