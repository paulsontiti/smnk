import Layout from "@/admin/components/adminLayout";
import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";
import { BlackTypography } from "@/components/card/ClientJobDetailsCard";
import BlackLoadingButton from "@/components/home/navbar/loginButton";
import UserBankDetails from "@/components/pay-sw";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { getAllpendingWithrawalRequests } from "@/lib/types/job";
import { AlertColor, Box, Card, CardContent } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

type Request = {
  userId: string;
  amount: number;
  _id?: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
};

function WithdrawalPage() {
  return (
    <Layout>
      <WithdrawalRequest />
    </Layout>
  );
}

export default WithdrawalPage;

function WithdrawalRequest() {
  const { data, error } = useSWR(
    "getpendingRequests",
    getAllpendingWithrawalRequests()
  );
  if (error) return <ErrorAlert />;
  if (!data) return <LoadingAlert />;
  return (
    <Box>
      {Array.isArray(data) && data.length > 0 ? (
        <>
          {data.map((req: Request) => (
            <RequestComponent key={req._id} request={req} />
          ))}
        </>
      ) : (
        <InfoAlert message="No Pending request" />
      )}
    </Box>
  );
}

function RequestComponent({ request }: { request: Request }) {
  const [msg, setMsg] = React.useState("");
  const [color, setColor] = React.useState<AlertColor>("error");
  const router = useRouter();
  //declare refs
  const snackBarRef = React.useRef();

  const confirmPayment = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/a-dashboard/withdrawal/confirm-payment`,
        data: { withdrawalId: request._id ?? "" },
      });
      const data = await res.data;
      if (data) {
        setMsg("Withdrawal Request was updated successfully");
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
          router.reload();
        }, 3000);
      } else {
        setMsg("An Error occurred,Please try again");
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    } catch (err: any) {
      console.log(err);
      setMsg(err.message);
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
    }
  };
  if (!request) return <p></p>;
  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
        <BlackTypography label="Amount" value={request.amount.toString()} />
        <BlackTypography label="Bank Name" value={request.bankName ?? ""} />
        <BlackTypography
          label="Account Name"
          value={request.accountName ?? ""}
        />
        <BlackTypography
          label="Account Number"
          value={request.accountNumber ?? ""}
        />
      </CardContent>
      <BlackLoadingButton
        variant="contained"
        handleClick={confirmPayment}
        label="Confirm Payment"
      />
    </Card>
  );
}
