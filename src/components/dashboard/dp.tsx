import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserRating from "./UserRating";
import { getUserProfile } from "@/lib/utils/user";
import { useEffect, useState } from "react";
import ProfilePic from "../avatar/ProfilePic";

export default function DP() {
  const { user } = useSelector((state: RootState) => state.users);

  const [name,setName] = useState('')

  useEffect(()=>{
    (
      async()=>{
        const {data} = await getUserProfile(user._id)
        if(data){
          if(user.typeClass === 'individual'){
            setName(data.firstName + ' ' + data.lastName)
          }else{
            setName(data.name)
          }
        }
      }
    )()
  },[user])
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ProfilePic/>
      <br />

      {user && user.type !== "admin" && (
        <>
          
            {name && (
              <Box>
                <Typography variant="caption">Welcome </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant="caption">
                  {name}
                </Typography>
              </Box>
            )}
            <Box>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                SMNK_ID:{" "}
              </Typography>
              <Typography variant="caption">{user._id}</Typography>
            </Box>
            
          <UserRating rating={user.rating}/>
        </>
      )}
    </Box>
  );
}
