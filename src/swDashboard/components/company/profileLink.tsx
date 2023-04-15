import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useSWR from 'swr'
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getCompanyProfile } from '@/lib/utils/user';


export default function CompanyProfileLink(){
   
const router = useRouter()
    const {user} = useSelector((state:RootState)=>state.users)
    const {data,error} = useSWR('getCompProfile',getCompanyProfile(user._id))

if(error) return <p>Error occurred</p>
if(!data) return (
            <ListItemButton sx={{ ml: 8 }} onClick={()=>{
                router.push('/dashboard/company/add-company-profile') 
            }}>
                <ListItemText  primary={ 'Add Profile'} />
            </ListItemButton>
    )
    return(
         <ListItemButton sx={{ ml: 8}} onClick={()=>{
            router.push(`/dashboard/company`)
         }}>
            <ListItemText  primary={`Profile`} />
        </ListItemButton>
    )
}