import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import useSWR from 'swr'

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import { getUserBankDetails } from '@/lib/utils/user';


export default function BankDetailsLink(){
           
    const {user} = useSelector((state:RootState)=>state.users)
    const {data,error} = useSWR('getBankDetails', getUserBankDetails(user._id))

    if(error) return <p>Error occurred</p>
    if(!data) return(
        <ListItemButton sx={{ ml: 8 }}>
            <Link href={'/sw-dashboard/bank-details/add-bank-details'}>
                <ListItemText  primary={'Add Bank Details'} />
            </Link>
        </ListItemButton>
    )
    
        return(
            <ListItemButton sx={{ ml: 8 }}>
                
              <Link href={'/sw-dashboard/bank-details'}>
                      
                      <ListItemText  primary={'Bank Details'} />
                  </Link>
              </ListItemButton> 
        )
}