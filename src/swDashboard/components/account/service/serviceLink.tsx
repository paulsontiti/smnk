import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import useSWR from 'swr'
import { getUserServices } from '@/lib/utils/user';
import { useRouter } from 'next/router';


export default function ServiceLink(){
   
        const router = useRouter()
    const {user} = useSelector((state:RootState)=>state.users)

    
    if(user.services.length < 1) return(
       
        <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
            router.push('/sw-dashboard/service/add-service')
          }}>
    <ListItemText primary={'Add Service'} />      
    </ListItemButton>
    )
    
        return(
            <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
                router.push('/sw-dashboard/service')
              }}>
        <ListItemText primary={'Service'} />      
        </ListItemButton>
         
        )
}