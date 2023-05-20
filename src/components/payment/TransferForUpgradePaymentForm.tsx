
import React, { useState } from "react";
import {IconButton,Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import SMNKBankDetails from "./smnkBankDetais";
import Image from 'next/image'
import {useRouter} from 'next/router'
import { useSelector } from "react-redux";
import { RootState } from "@/store";



function TransferForUpgradePaymentForm({packageName}:{packageName:string}) {

  const {_id} = useSelector((state:RootState)=>state.users.user)

  const router = useRouter()

  const [file, setFile] = useState<any>();
  const [displayFile, setDisplayFile] = useState('');

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      setDisplayFile(e.target.result);
    };
    
    file && fileReader.readAsDataURL(file);
  };

  const submitHandler = async (e:any) => {
    e.preventDefault()
    try {
      if (file) {
        const formData = new FormData()
        formData.append('sub',file) 
        formData.append('userId',_id)
        formData.append('type',packageName)

        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/sub`,
          data: formData,
        });
        const data = await res.data;
        alert(data.message)
        if(data.successful){
          router.push('/c-dashboard')
        }
        // setDp(data);
        // setFile('')
      } else {
        console.log("Invalid request");
      }
    } catch (err: any) {
      console.log(err);
      return false;
    }
  };
  

  return (
    <>
      <SMNKBankDetails/>
      <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <IconButton color="primary" type="submit">
          {
            
          file  && (
            <>
              <Image src={displayFile} alt="image to upload" width={100} height={100}/>
              <UploadIcon />
            </>
          )}
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input
            name="sub"
            onChange={handleChange}
            hidden
            accept="image/*"
            type="file"
          />
                        <PhotoCamera />
          {!file && <>
                        <Typography sx={{marginRight:'1rem'}} component='span'>Upload Proof of Payment</Typography>
                    </>}
        </IconButton>
      </form>
    </>
  );
}

export default TransferForUpgradePaymentForm;
