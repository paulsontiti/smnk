import {Avatar} from '@mui/material'


function DPAvatar({dp}:{dp:string}) {
 
  return (
    <>
  <Avatar
    alt=""
    src={`/api/multer/profile-pic/${dp}`}
    sx={{ width: 30, height: 30 }}
  /> 
   
    </>
  )
}

export default DPAvatar