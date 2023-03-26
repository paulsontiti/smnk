import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import useSWR from 'swr'

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import { getUserInfo } from '@/lib/utils/user';


export default function UserInfoLink(){
   
    const {user} = useSelector((state:RootState)=>state.users)
    const {data,error} = useSWR('getInfo',getUserInfo(user._id))

if(!data) return(
    <ListItemButton sx={{ ml: 8 }}>
    <Link href={'/dashboard/individual/add-personal-info'}>
       
        <ListItemText  primary={'Add Personal Info'} />
    </Link>
  </ListItemButton>
)
    return(
        <ListItemButton sx={{ ml: 8 }}>
               <Link href={`/dashboard/individual`}>
                  
                   <ListItemText  primary={`Personal Info`} />
               </Link>
             </ListItemButton>
    )
}