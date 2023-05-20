import ChatFloatingActionButtons from '@/components/fab/Chat'
import { BottomNavigation } from '@mui/material';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import React, { useState } from 'react'

function AdminChatAction() {
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
            label="Chat Client"
            icon={<ChatFloatingActionButtons handleClick={async () => {
               
              }} />}
          />
          </BottomNavigation>
  )
}

export default AdminChatAction