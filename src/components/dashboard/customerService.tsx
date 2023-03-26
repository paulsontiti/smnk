import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { List } from '@mui/material';


export const CustomerService = ({customerHandleClick,openCustomer}:{customerHandleClick:()=>void,openCustomer:boolean}) => {
  return (
    <>
         <ListItemButton sx={{ml:1}} onClick={customerHandleClick}>
       
       <ListItemText primary="Customer Service" />
       {openCustomer ? <ExpandLess /> : <ExpandMore />}
     </ListItemButton>
     <Collapse in={openCustomer} timeout="auto" unmountOnExit>
       <List component="div" disablePadding>
         <ListItemButton  sx={{ ml: 4 }}>
         <ListItemText primary="Admin's Contacts" />      
         </ListItemButton>
         <ListItemButton  sx={{ ml: 4 }}>
         <ListItemText primary="Send Message" />      
         </ListItemButton>
         <ListItemButton sx={{ ml: 4 }}>
         <ListItemText primary="Live Chat" />      
         </ListItemButton>
   
       </List>
     </Collapse>
    </>
  )
}
