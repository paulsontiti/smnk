
import { Button,Box } from '@mui/material';

function GenericActions({confirmAction}:{confirmAction:(confirm:boolean)=>void}) {
  return (
   <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
    <Button variant='outlined' sx={{mr:2}} onClick={()=>{
        confirmAction(true)
    }}>Yes</Button>
    <Button variant='contained' onClick={()=>{
        confirmAction(false)
    }}>No</Button>
   </Box>
  )
}

export default GenericActions