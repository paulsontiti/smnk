import {Avatar,Skeleton} from '@mui/material'


function DPAvatar({dp}:{dp:string}) {
 
  return (
    <>
  {
    dp ?   <Avatar
    alt=""
    src={`/api/multer/profile-pic/${dp}`}
    sx={{ width: 30, height: 30 }}
  /> : 
  <Skeleton width={30} height={30} variant='circular'/>
  }
   
    </>
  )
}

export default DPAvatar