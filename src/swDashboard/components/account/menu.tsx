import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from "next/link";

import { useSelector } from 'react-redux'
import { RootState } from '@/store'



   

export default function DashboardMenu() {

  const {info} = useSelector((state:RootState)=>state.users)
  const [openAccount, setOpenAccount] = React.useState(true);
  const [openProfile, setOpenProfile] = React.useState(true);
  const [openJob, setOpenJob] = React.useState(true);
  const [openCustomer, setOpenCustomer] = React.useState(true);

  const accountHandleClick = () => {
    setOpenAccount(!openAccount);
  };

  const profileHandleClick=()=>{
    setOpenProfile(!openProfile);
  }

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
        <ListItemButton onClick={profileHandleClick} sx={{ ml: 4 }}>
        
        <ListItemText primary="Profile" />
        {openProfile ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProfile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ ml: 8 }}>
            <Link href={info && info.userId ? `/sw-dashboard/personal-info` : '/sw-dashboard/add-personal-info'}>
               
                <ListItemText  primary={info && info.userId ? `Personal Info` : 'Add Personal Info'} />
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ ml: 8 }}>
            
            <ListItemText primary="Experience" />
          </ListItemButton>
          <ListItemButton sx={{ ml: 8 }}>
            
            <ListItemText primary="Services & Skills" />
          </ListItemButton>
          <ListItemButton sx={{ ml: 8 }}>
            
            <ListItemText primary="Bank Details" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton  sx={{ ml: 4 }}>
      
        <ListItemText primary="Boost Visibility" />
      </ListItemButton>
      <ListItemButton  sx={{ ml: 4 }}>
       
        <ListItemText primary="Change Password" />
      </ListItemButton>
      <ListItemButton  sx={{ ml: 4 }}>
        
        <ListItemText primary="Terms & Conditions" />
      </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton sx={{ml:1}} onClick={jobHandleClick}>
       
        <ListItemText primary="Job" />
        {openJob ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openJob} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton  sx={{ ml: 4 }}>
          <ListItemText primary="Recommended" />      
          </ListItemButton>
          <ListItemButton  sx={{ ml: 4 }}>
          <ListItemText primary="Current" />      
          </ListItemButton>
          <ListItemButton sx={{ ml: 4 }}>
          <ListItemText primary="Done" />      
          </ListItemButton>
    
        </List>
      </Collapse> 
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
      
    </List>
  );
}