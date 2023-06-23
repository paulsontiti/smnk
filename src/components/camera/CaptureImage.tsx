import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { AlertColor, Box, Container, Typography } from "@mui/material";
import CaptureBottomNavigation from "../bottomNavigation/CaptureBottomNavigation";
import Image from "next/image";
import DeleteUploadImageBottomNavigation from "../bottomNavigation/DeleteUploadImageBottomNavigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updateSWExtra } from "@/store/slices/swExtraSlice";
import SnackbarComponent from "../snackbar/SnackBar";
import { useRouter } from "next/router";
import { SWExtra } from "@/lib/types/userInfo";

const videoConstraints = {
  width: 250,
  facingMode: "enviroment",
};



export default function CaptureCameraImage() {
  const webcamRef = useRef<Webcam | null>(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const {_id} = useSelector((state:RootState)=>state.users.user)
  const dispatch = useDispatch<AppDispatch>()
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const router = useRouter()
  //declare refs
  const snackBarRef = useRef();

  const capturePhoto = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot() as string;
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  const uploadPhotoHandler = async () => {
    setUploading(true)
    try {
      if (url) {
      
  
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/capture/camera-photo`,
          data: {userId:_id,capturedPhotoUrl:url},
        });
        const data = await res.data;
        if(data.successful){
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          //get swExtra from local storage
        let swExtra:SWExtra = JSON.parse(
          JSON.parse(JSON.stringify(localStorage.getItem("swExtra")))
          );
          
          //update the verification
          swExtra.verification = {...swExtra.verification,capturedPhotoUrl:url};
          
          //save the new swExtra details in the localstorage
          localStorage.setItem("swExtra", JSON.stringify(swExtra));
          setUploading(false)
          setUrl("");
        dispatch(updateSWExtra());
       setTimeout(()=>{
        router.push('/sw-dashboard/verification')
       },6000)
        }else{
          setMsg(data.message);
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
    <Box
      flexDirection={"column"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"} mt={2}
    >
    <Webcam
        audio={false}
        height={250}
        ref={webcamRef}
        width={"98%"}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        
      /> 
       <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <CaptureBottomNavigation label="Capture" handleClick={capturePhoto} />
      {url && (
        <Container sx={{mt:'1rem',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <Typography>Captured Photo Preview</Typography>
          <Image
           
            style={{ marginTop: ".5rem" }}
            src={url}
            width={250}
            height={250}
            alt="verification capture"
          />
          <DeleteUploadImageBottomNavigation
            deleteHandleClick={() => {
              setUrl('')
            }}
            uploadHandleClick={uploadPhotoHandler}
            uploading={uploading}
          />
        </Container>
      )}
    </Box>
  );
}
