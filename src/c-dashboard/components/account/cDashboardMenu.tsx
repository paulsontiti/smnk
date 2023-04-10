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
import { CustomerService } from '@/components/dashboard/customerService';
import UserInfoLink from '@/swDashboard/components/individual/info';
import CompanyProfileLink from '@/swDashboard/components/company/profileLink';



   

export default function CDashboardMenu() {
  const {user} = useSelector((state:RootState)=>state.users)


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
        {user && user.typeClass === 'Individual' ? <UserInfoLink/>: <CompanyProfileLink/>}
      
      <ListItemButton  sx={{ ml: 4 }}>
       
      <Link href='/sw-dashboard/change-password'>
                  
                  <ListItemText  primary='Change Password' />
              </Link>
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
          <Link href='/c-dashboard/job'>Jobs</Link>    
          </ListItemButton>
          <ListItemButton  sx={{ ml: 4 }}>
          <Link href='/c-dashboard/job/create-job'>Create New Job</Link>    
          </ListItemButton>
          <ListItemButton  sx={{ ml: 4 }}>
          <ListItemText primary="View Reports" />      
          </ListItemButton>
          <ListItemButton sx={{ ml: 4 }}>
          <ListItemText primary="Completed Jobs" />      
          </ListItemButton>
    
        </List>
      </Collapse> 
      <CustomerService customerHandleClick={customerHandleClick} openCustomer={openCustomer}/>
      
    </List>
  );
}