import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import useSWR from 'swr'

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getCompanyProfile } from '@/lib/utils/user';
import { CompanyInfo } from '@/lib/types/userInfo';


export default function CompanyProfileLink(){
   

    const {user} = useSelector((state:RootState)=>state.users)
    const {data,error} = useSWR('getCompProfile',getCompanyProfile(user._id))

if(error) return <p>Error occurred</p>
if(!data) return (
              <ListItemButton sx={{ ml: 8 }}>
              <Link href={ '/dashboard/company/add-company-profile'}>
                 
                  <ListItemText  primary={ 'Add Company Profile'} />
              </Link>
            </ListItemButton>
    )
    return(
         <ListItemButton sx={{ ml: 8 }}>
              <Link href={`/dashboard/company`}>
                 
                  <ListItemText  primary={`Company Profile`} />
              </Link>
            </ListItemButton>
    )
}