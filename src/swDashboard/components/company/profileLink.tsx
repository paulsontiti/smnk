import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useSWR from 'swr'
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getCompanyProfile } from '@/lib/utils/user';
import { ListItemIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function CompanyProfileLink(){
   
const router = useRouter()
    const {user} = useSelector((state:RootState)=>state.users)
    const {data,error} = useSWR('getCompProfile',getCompanyProfile(user._id))

if(error) return <p>Error occurred</p>
if(!data) return (
            <ListItemButton sx={{ ml: 8 }} onClick={()=>{
                router.push('/dashboard/company/add-company-profile') 
            }}>
                 <ListItemIcon><PersonAddIcon sx={{color:"yellow"}}/></ListItemIcon>
                <ListItemText  primary={ 'Add Profile'} />
            </ListItemButton>
    )
    return(
         <ListItemButton sx={{ ml: 8}} onClick={()=>{
            router.push(`/dashboard/company`)
         }}>
                <ListItemIcon><PersonIcon sx={{color:"yellow"}}/></ListItemIcon>
            <ListItemText  primary={`Profile`} />
        </ListItemButton>
    )
}