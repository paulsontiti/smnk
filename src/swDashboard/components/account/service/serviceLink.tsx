import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import BusinessIcon from '@mui/icons-material/Business';
import { ListItemIcon } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';


export default function ServiceLink(){
   
        const router = useRouter()
    const {user} = useSelector((state:RootState)=>state.users)

    
    if(user.services.length < 1) return(
       
        <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
            router.push('/sw-dashboard/service/add-service')
          }}>   <ListItemIcon><AddBusinessIcon sx={{color:"yellow"}}/></ListItemIcon>
    <ListItemText primary={'Add Services'} />      
    </ListItemButton>
    )
    
        return(
            <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
                router.push('/sw-dashboard/service')
              }}>
                    <ListItemIcon><BusinessIcon sx={{color:"yellow"}}/></ListItemIcon>
        <ListItemText primary={'Services'} />      
        </ListItemButton>
         
        )
}