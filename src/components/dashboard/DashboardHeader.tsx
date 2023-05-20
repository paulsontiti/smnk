import { Box } from '@mui/material'
import React from 'react'
import MessageBox from '../message/MessageBox'
import Logout from './logout'
import Notification from './Notification'

function DashboardHeader() {
  return (
    <Box sx={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <MessageBox/>
        <Notification/>
        <Logout/>
    </Box>
  )
}

export default DashboardHeader