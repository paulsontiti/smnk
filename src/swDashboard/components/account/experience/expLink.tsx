
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import useSWR from 'swr'
import { getUserExp } from "@/lib/utils/user";

export default function ExpLink(){
    
    const {user} = useSelector((state:RootState)=>state.users)
    const {data,error} = useSWR('getExp',getUserExp(user._id))
    
if(error) return <p>Error occurred</p>
if(data && data.length < 1) return(
    <ListItemButton sx={{ ml: 8 }}>
        <Link href={'/sw-dashboard/experience/add-experience'}>
            <ListItemText  primary={'Add Experience'} />
        </Link>
    </ListItemButton>
)

    return(
        <ListItemButton sx={{ ml: 8 }}>
            
          <Link href={'/sw-dashboard/experience'}>
                  
                  <ListItemText  primary={'Experience'} />
              </Link>
          </ListItemButton> 
    )
}