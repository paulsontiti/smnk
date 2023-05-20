import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';


export default function BankDetailsLink(){
           const router = useRouter()
    const {user} = useSelector((state:RootState)=>state.users)
    
    if(!user.bankDetails) return(
      
        <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
            router.push('/sw-dashboard/bank-details/add-bank-details')
          }}>
    <ListItemText primary={'Add Bank Details'} />      
    </ListItemButton>
    )
    
        return(
            <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
                router.push('/sw-dashboard/bank-details')
              }}>
        <ListItemText primary={'Bank Details'} />      
        </ListItemButton>

        )
}