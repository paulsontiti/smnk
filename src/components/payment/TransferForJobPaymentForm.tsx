import React, { useRef, useState } from "react";
import { IconButton, Typography, AlertColor } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import SMNKBankDetails from "./smnkBankDetais";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SnackbarComponent from "../snackbar/SnackBar";

function TransferForJobPaymentForm({ jobId }: { jobId: string }) {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

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
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append("pop", file);
        formData.append("jobId", jobId);
        formData.append("userId", _id);

        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/pop`,
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
        }
      } else {
        setMsg("Invalid request,select proof of payment");
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    } catch (err: any) {
      setMsg("An error occurred ,please try again");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
      console.log(err);
      return false;
    }
  };

  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <SMNKBankDetails />
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
              <UploadIcon />
            </>
          )}
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            name="pop"
            onChange={handleChange}
            hidden
            accept="image/*"
            type="file"
          />
          <PhotoCamera />
          {!file && (
            <>
              <Typography sx={{ marginRight: "1rem" }} component="span">
                Upload Proof of Payment
              </Typography>
            </>
          )}
        </IconButton>
      </form>
    </>
  );
}

export default TransferForJobPaymentForm;
