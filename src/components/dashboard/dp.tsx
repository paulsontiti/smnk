import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserRating from "./UserRating";
import { getUserProfile } from "@/lib/utils/user";
import { useEffect, useState } from "react";
import ProfilePic from "../avatar/ProfilePic";
import { Chip } from "@mui/joy";

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
        justifyContent: "center",bgcolor:'#D6E7FF',color:'black',width:250
      }}
    >
      <ProfilePic/>
      <br />

      {user && user.type !== "admin" && (
        <>
          
            {name && (
              <Box position={'relative'}>
              
                <Typography sx={{ fontWeight: "bold" }} variant="caption">
                  {name}
                </Typography>
                <Chip
        color="success"
          variant="soft"
          size="sm"
          sx={{
            minHeight: 20,
            fontSize: "xs2",
            position:'absolute',
            right:-30,
            top:-12
          }}
        >
          {user.type}/{user.typeClass}
        </Chip>
              </Box>
            )}
           
            
          <UserRating rating={user.rating} level={user.level} type={user.type}/>
        </>
      )}
    </Box>
  );
}
