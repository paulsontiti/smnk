
import { Button,Box } from '@mui/material';

function CatalogDeleteAction({confirmDelete}:{confirmDelete:(confirm:boolean)=>void}) {
  return (
   <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
    <Button variant='outlined' sx={{mr:2}} onClick={()=>{
        confirmDelete(true)
    }}>Yes</Button>
    <Button variant='contained' onClick={()=>{
        confirmDelete(false)
    }}>No</Button>
   </Box>
  )
}

export default CatalogDeleteAction