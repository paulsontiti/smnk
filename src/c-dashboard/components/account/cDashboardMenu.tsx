import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { CustomerService } from '@/components/dashboard/customerService';
import UserInfoLink from '@/swDashboard/components/individual/info';
import CompanyProfileLink from '@/swDashboard/components/company/profileLink';
import {useRouter} from 'next/router'


   

export default function CDashboardMenu() {
  const {user} = useSelector((state:RootState)=>state.users)
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
        {user && user.typeClass === 'individual' ? <UserInfoLink/>: <CompanyProfileLink/>}
      
      <ListItemButton  sx={{ ml: 4 }} onClick={()=>{
        router.push('/dashboard/change-password')
      }}>
        <ListItemText  primary='Change Password' />
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
        <ListItemButton  sx={{ ml: 4 }} onClick={()=>{
          router.push('/c-dashboard/job')
        }}>
          <ListItemText primary="Jobs" />     
          </ListItemButton>
          <ListItemButton  sx={{ ml: 4 }} onClick={()=>{
            router.push('/c-dashboard/job/create-job') 
          }}>
            
          <ListItemText primary="Create new Job" />        
          </ListItemButton>
          
          <ListItemButton sx={{ ml: 4 }} onClick={()=>{
            router.push('/c-dashboard/job/completed-jobs') 
          }}>
          <ListItemText primary="Completed Jobs" />      
          </ListItemButton>
    
        </List>
      </Collapse> 
      <CustomerService customerHandleClick={customerHandleClick} openCustomer={openCustomer}/>
      
    </List>
  );
}