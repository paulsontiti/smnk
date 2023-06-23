
import { Button,Box } from '@mui/material';

function LogoutActions({confirmLogout}:{confirmLogout:(confirm:boolean)=>void}) {
  return (
   <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
    <Button variant='outlined' sx={{mr:2}} onClick={()=>{
        confirmLogout(true)
    }}>Yes</Button>
    <Button variant='contained' onClick={()=>{
        confirmLogout(false)
    }}>No</Button>
   </Box>
  )
}

export default LogoutActions