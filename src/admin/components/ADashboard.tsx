import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { useRouter } from 'next/router';



   

export default function ADashboardMenu() {

  const router = useRouter()

  const [openAccount, setOpenAccount] = React.useState(true);
  const [openJob, setOpenJob] = React.useState(true);
  const [openCustomer, setOpenCustomer] = React.useState(true);

  const accountHandleClick = () => {
    setOpenAccount(!openAccount);
  };

  const jobHandleClick=()=>{
    setOpenJob(!openJob);
  }

  const customerHandleClick=()=>{
    setOpenCustomer(!openCustomer);
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360,pl:0 ,overflowY:"auto"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
         <ListItemButton sx={{ml:1}} onClick={accountHandleClick}>
        
        <ListItemText primary="Account" />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAccount} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton  sx={{ ml: 4 }}>
       
       <Link href='/a-dashboard/profile'>
                   
                   <ListItemText  primary='Profile' />
               </Link>
       </ListItemButton>
      
      <ListItemButton  sx={{ ml: 4 }}>
       
      <Link href='/sw-dashboard/change-password'>
                  
                  <ListItemText  primary='Change Password' />
              </Link>
      </ListItemButton>
      
        </List>
      </Collapse>
      <ListItemButton sx={{ml:1}} onClick={jobHandleClick}>
       
        <ListItemText primary="Job" />
        {openJob ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openJob} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton  sx={{ ml: 4 }} onClick={()=>{
                                                        router.push('/a-dashboard/job')
                                                     }}  
        >
            <ListItemText primary='View Jobs' />    
        </ListItemButton>
        <ListItemButton  sx={{ ml: 4 }} onClick={()=>{
                                                        router.push('/a-dashboard/job/complaints')
                                                     }}  >
            <ListItemText primary='View Complaints' />    
        </ListItemButton>
        <ListItemButton  sx={{ ml: 4 }} onClick={()=>{
                                                        router.push('/a-dashboard/payments')
                                                     }}  >
            <ListItemText primary='View Payments' />    
        </ListItemButton>
    
        </List>
      </Collapse> 
      
    </List>
  );
}