import React, { useRef, useState } from "react";
import { IconButton, Typography, AlertColor, Box } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import SMNKBankDetails from "./smnkBankDetais";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import SnackbarComponent from "../snackbar/SnackBar";
import { LoadingButton } from "@mui/lab";
import { updateSWExtra } from "@/store/slices/swExtraSlice";
import { SmnkErrorBoundary } from "@/pages/_app";

function TransferForUpgradePaymentForm({
  packageName,
}: {
  packageName: string;
}) {
  const [uploading, setUploading] = useState(false);
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();
  //declare refs
  const snackBarRef = useRef();
  const router = useRouter();

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
        formData.append("sub", file);
        formData.append("userId", _id);
        formData.append("type", packageName);
        //get swExtra from local storage
        let swExtra = JSON.parse(
          JSON.parse(JSON.stringify(localStorage.getItem("swExtra")))
        );
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/sub`,
          data: formData,
        });
        const data = await res.data;
        swExtra.subscription = {
          ...swExtra.subscription,
          type: packageName,
          pop: data.resData,
        };
        if (data.successful) {
          //save the new user details in the localstorage
          localStorage.setItem("swExtra", JSON.stringify(swExtra));
          dispatch(updateSWExtra());
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setTimeout(() => {
            router.push("/sw-dashboard/visibility");
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
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <SMNKBankDetails />
      <PaymentForm
        submitHandler={submitHandler}
        file={file}
        displayFile={displayFile}
        uploading={uploading}
        color={color}
        handleChange={handleChange}
      />
    </>
  );
}

export default TransferForUpgradePaymentForm;

export function PaymentForm({
  submitHandler,
  file,
  displayFile,
  uploading,
  color,
  handleChange,
}: {
  submitHandler: any;
  file: any;
  displayFile: string;
  uploading: boolean;
  color: any;
  handleChange: any;
}) {
  return (
    <SmnkErrorBoundary>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <IconButton color="primary" type="submit">
          {file && (
            <>
              <Image
                src={displayFile}
                alt="image to upload"
                width={100}
                height={100}
              />
              <LoadingButton
                loading={uploading}
                loadingPosition="start"
                startIcon={
                  uploading ? null : (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      ml={2}
                    >
                      <UploadIcon sx={{ color: `${color}.900` }} />
                      <Typography
                        component="span"
                        sx={{ textTransform: "capitalize" }}
                      >
                        Upload
                      </Typography>
                    </Box>
                  )
                }
              ></LoadingButton>
            </>
          )}
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            name="sub"
            onChange={handleChange}
            hidden
            accept="image/*"
            type="file"
          />
          <PhotoCamera />
          <Typography component="span">
            {file ? "Change Photo" : "Select Proof of Payment"}
          </Typography>
        </IconButton>
      </form>
    </SmnkErrorBoundary>
  );
}
