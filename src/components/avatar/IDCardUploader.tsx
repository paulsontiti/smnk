import React, { useRef, useState } from "react";
import { IconButton, Box, Typography, Container } from "@mui/material";
import Image from "next/image";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import axios from "axios";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";
import { SWExtra } from "@/lib/types/userInfo";
import { updateSWExtra } from "@/store/slices/swExtraSlice";
import SnackbarComponent from "../snackbar/SnackBar";
import { useRouter } from "next/router";
import { AlertColor } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function IDCardUploader() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [file, setFile] = useState<any>();
  const [displayFile, setDisplayFile] = useState("");
  const [uploading, setUploading] = useState(false);
const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const router = useRouter();
  //declare refs
  const snackBarRef = useRef();

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
    setUploading(true);
    try {
      if (_id && file) {
        const formData = new FormData();
        formData.append("idCard", file);
        formData.append("userId", _id);

        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/id-card`,
          data: formData,
        });
        const data = await res.data;
        if (data) {
          setMsg("Id Card uploaded successfully");
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          //get swExtra from local storage
          let swExtra: SWExtra = JSON.parse(
            JSON.parse(JSON.stringify(localStorage.getItem("swExtra")))
          );

          //update the verification
          swExtra.verification = { ...swExtra.verification, idCardUrl: data };

          //save the new swExtra details in the localstorage
          localStorage.setItem("swExtra", JSON.stringify(swExtra));
          setUploading(false);
          setFile("");
          dispatch(updateSWExtra());
          setTimeout(() => {
            router.push("/sw-dashboard/verification");
          }, 6000);
        } else {
          setMsg("An Error occurred. Id Card not uploaded. Please try again");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      }
    } catch (err: any) {
      console.log(err);
      return false;
    }
  };

  return (
    <Container sx={{ mt: "5rem" }}>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <IconButton type="submit" color="primary">
          {file && (
            <Box
              mt={"2rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                src={displayFile}
                alt="image to upload"
                width={200}
                height={200}
              />
              {uploading ? (
                <LoadingButton
                  loading={uploading}
                  loadingPosition="start"
                ></LoadingButton>
              ) : (
                <Box
                  ml={1}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                >
                  <UploadIcon />
                  <Typography variant="caption">Upload</Typography>
                </Box>
              )}
            </Box>
          )}
        </IconButton>
        <IconButton aria-label="upload picture" component="label" color="primary">
          <input
            name="idCard"
            onChange={handleChange}
            hidden
            accept="image"
            type="file"
          />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <AddAPhotoIcon />
            <Typography variant="caption">Select Your ID card</Typography>
          </Box>
        </IconButton>
      </form>
    </Container>
  );
}

export default IDCardUploader;
