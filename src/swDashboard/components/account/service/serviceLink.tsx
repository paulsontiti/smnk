import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import useSWR from 'swr'
import { getUserServices } from '@/lib/utils/user';


export default function ServiceLink(){
   
        
    const {user} = useSelector((state:RootState)=>state.users)
    const {data,error} = useSWR('getServ',getUserServices(user._id))

    if(error) return <p>Error occurred</p>
    if(data && data.length < 1) return(
        <ListItemButton sx={{ ml: 8 }}>
            <Link href={'/sw-dashboard/service/add-service'}>
                <ListItemText  primary={'Add Service'} />
            </Link>
        </ListItemButton>
    )
    
        return(
            <ListItemButton sx={{ ml: 8 }}>
                
              <Link href={'/sw-dashboard/service'}>
                      
                      <ListItemText  primary={'Services'} />
                  </Link>
              </ListItemButton> 
        )
}