import { Box } from '@mui/material'
import React from 'react'
import MessageBox from '../message/MessageBox'
import Logout from './logout'

function DashboardHeader() {
  return (
    <Box sx={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <MessageBox/>
        <Logout/>
    </Box>
  )
}

export default DashboardHeader