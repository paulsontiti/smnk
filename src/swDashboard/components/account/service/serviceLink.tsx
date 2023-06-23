import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import BusinessIcon from '@mui/icons-material/Business';
import { ListItemIcon, Typography } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';


export default function ServiceLink(){
   
        const router = useRouter()
    const {swExtra} = useSelector((state:RootState)=>state.swExtra)
    if( !swExtra.services) return(
       
        <ListItemButton  sx={{ ml: 2 }}  onClick={()=>{
            router.push('/sw-dashboard/service/add-service')
          }}>   <ListItemIcon><AddBusinessIcon sx={{color:"white"}}/></ListItemIcon>
   <ListItemText primary={<Typography variant="caption">Add Services</Typography>} /> 
    </ListItemButton>
    )
    
        return(
            <ListItemButton  sx={{ ml: 2 }}  onClick={()=>{
                router.push('/sw-dashboard/service')
              }}>
                    <ListItemIcon><BusinessIcon sx={{color:"white"}}/></ListItemIcon>
                    <ListItemText primary={<Typography variant="caption">Services</Typography>} />     
        </ListItemButton>
         
        )
}