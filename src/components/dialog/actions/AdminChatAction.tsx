import AdminChatFloatingButton from '@/components/fab/AdminChatFloatingButton';
import { BottomNavigation } from '@mui/material';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import React, { useState } from 'react'

function AdminChatAction({receiverId}:{receiverId:string}) {
    const [value,setValue] = useState()
  return (
    <BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
  >
    <BottomNavigationAction
            label="Start A Chat"
            icon={<AdminChatFloatingButton receiverId={receiverId}/>}
          />
          </BottomNavigation>
  )
}

export default AdminChatAction