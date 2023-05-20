import React from 'react'
import {Avatar,Skeleton} from '@mui/material'

function DPAvatar({dp}:{dp:string}) {
  
  return (
    <>
    {
              dp ? <Avatar
              alt=""
              src={`/uploads/images/dp/${dp}`}
              sx={{ width: 50, height: 50 }}
            /> : <Skeleton variant="circular" animation='wave' width={50} height={50} />
            }
    </>
  )
}

export default DPAvatar