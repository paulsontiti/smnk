import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { List } from '@mui/material';
import {useRouter} from 'next/router'

export const CustomerService = ({customerHandleClick,openCustomer}:
                                  {customerHandleClick:()=>void,openCustomer:boolean}
                                ) => {
  
                                  const router = useRouter()
  return (
    <>
         <ListItemButton sx={{ml:0}} onClick={customerHandleClick}>
       
       <ListItemText primary="Customer Service" />
       {openCustomer ? <ExpandLess /> : <ExpandMore />}
     </ListItemButton>
     <Collapse in={openCustomer} timeout="auto" unmountOnExit>
       <List component="div" disablePadding>
         {/* <ListItemButton  sx={{ ml: 4 }} onClick={()=> router.push('/message/admin-contact')}>
         <ListItemText primary="Admin's Contacts" />      
         </ListItemButton> */}
       
        
   
       </List>
     </Collapse>
    </>
  )
}
