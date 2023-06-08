import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PaymentIcon from '@mui/icons-material/Payment';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { ListItemIcon } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';

export default function BankDetailsLink(){
           const router = useRouter()
    const {user} = useSelector((state:RootState)=>state.users)
    
    if(!user.bankDetails) return(
      
        <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
            router.push('/sw-dashboard/bank-details/add-bank-details')
          }}> <ListItemIcon><AddCardIcon sx={{color:"yellow"}}/></ListItemIcon>
    <ListItemText primary={'Add Bank Details'} />      
    </ListItemButton>
    )
    
        return(
            <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
                router.push('/sw-dashboard/bank-details')
              }}>   <ListItemIcon><PaymentIcon sx={{color:"yellow"}}/></ListItemIcon>
        <ListItemText primary={'Bank Details'} />      
        </ListItemButton>

        )
}