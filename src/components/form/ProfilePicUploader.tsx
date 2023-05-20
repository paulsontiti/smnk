import React, { useState,useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";

function ProfilePicUploader({updateDp}:{updateDp:(dp:string)=>void}) {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [file, setFile] = useState<any>();
  const [displayFile, setDisplayFile] = useState();
  const [dp, setDp] = useState('');

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
      if (_id && file) {
        const formData = new FormData()
        formData.append('profilePic',file) 
        formData.append('userId',_id)

        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/profile-pic`,
          data: formData,
        });
        const data = await res.data;
        setDp(data);
        setFile('')
      } else {
        console.log("Invalid request");
      }
    } catch (err: any) {
      console.log(err);
      return false;
    }
  };
  useEffect(()=>{
    updateDp(dp)
  },[dp,updateDp])
  

  return (
    <form
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <IconButton color="primary" type="submit">
        {
          
        file  && (
          <>
            <Avatar src={displayFile} alt="image to upload" />
            <UploadIcon />
          </>
        )}
      </IconButton>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input
          name="profilePic"
          onChange={handleChange}
          hidden
          accept="image"
          type="file"
        />
        {!file && <PhotoCamera />}
      </IconButton>
    </form>
  );
}

export default ProfilePicUploader;
