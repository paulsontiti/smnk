import Layout from "@/components/dashboard/layout";
import React, { useRef, useState } from "react";
import { AlertColor, Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import SMNKBankDetails from "@/components/payment/smnkBankDetais";
import { PaymentForm } from "@/components/payment/TransferForUpgradePaymentForm";

function AddMoneyPage() {
  const router = useRouter();
  return (
    <Layout>
      <AddMoneyForm />
    </Layout>
  );
}

export default AddMoneyPage;

function AddMoneyForm() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const [uploading, setUploading] = useState(false);
  //declare refs
  const snackBarRef = useRef();
  const [file, setFile] = useState<any>();
  const [displayFile, setDisplayFile] = useState("");

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      setDisplayFile(e.target.result);
    };

    file && fileReader.readAsDataURL(file);
  };

  const submitHandler = async (e: any) => {
    setUploading(true);
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append("wallet", file);
        formData.append("userId", _id);

        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/wallet`,
          data: formData,
        });
        const data = await res.data;

        if (data.successful) {
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setTimeout(() => {
            router.back();
          }, 6000);
        } else {
          setMsg(data.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setUploading(false);
        }
      } else {
        setMsg("Invalid request,select proof of payment");
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setUploading(false);
      }
    } catch (err: any) {
      setMsg("An error occurred ,please try again");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
      setUploading(false);
      console.log(err);
      return false;
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
      width={"100%"}
      p={2}
      mt={5}
    >
      <Typography variant="h6" mb={2}>
        Add Money To Your Account
      </Typography>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />

      <SMNKBankDetails />
      <PaymentForm
        submitHandler={submitHandler}
        uploading={uploading}
        color={color}
        handleChange={handleChange}
        file={file}
        displayFile={displayFile}
      />
    </Box>
  );
}
