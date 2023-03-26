import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from "next/link";

import {useSelector } from 'react-redux'
import {RootState } from '@/store'
import useSWR from 'swr'
import axios from 'axios';
import { CustomerService } from '@/components/dashboard/customerService';
import UserInfoLink from '../individual/info';
import CompanyProfileLink from '../company/profileLink';
import ExpLink from './experience/expLink';
import ServiceLink from './service/serviceLink';
import BankDetailsLink from './bank-details/bankDetailsLink';

// const isExpAdded = (action:string,userId:string)=>{
//   const {data,error} = useSWR('getExps',async ()=>{
//     try{
//             const res = await axios({
//                     method:'POST',
//                     url:`${process.env.SMNK_URL}api/sw-dashboard/experience-utils`,
//                     data:{action,userId}
//                 })
//             const data = await res.data
//             return data
    
//     }catch(err:any){
//         console.log(err)
//         return
//     }
//   })
//   return {data,error}
// }

   

export default function SWDashboardMenu() {
  const {user} = useSelector((state:RootState)=>state.users)

  const {bankDetailsAdded} = useSelector((state:RootState)=>state.bankDetails)


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
         {user && user.typeClass === 'Individual' ? <UserInfoLink/>: <CompanyProfileLink/>}
          <ExpLink/>
          <ServiceLink/>
          <BankDetailsLink/>
        </List>
      </Collapse>
      <ListItemButton  sx={{ ml: 4 }}>
      
      <Link href='/sw-dashboard/visibility'>
                  
                  <ListItemText  primary='Boost Visibility' />
              </Link>
      </ListItemButton>
      <ListItemButton  sx={{ ml: 4 }}>
       
      <Link href='/sw-dashboard/change-password'>
                  
                  <ListItemText  primary='Change Password' />
              </Link>
      </ListItemButton>
      <ListItemButton  sx={{ ml: 4 }}>
        
      <Link href='/dashboard/terms-and-condition'>
                  
                  <ListItemText  primary='Terms & Conditions' />
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
     <CustomerService openCustomer={openCustomer} customerHandleClick={customerHandleClick}/>
      
    </List>
  );
}