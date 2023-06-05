import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


export default function AdminChatFloatingButton({receiverId}:{receiverId:string}) {
  const {_id} = useSelector((state:RootState)=>state.users.user)
  const router = useRouter()
  return (
      <IconButton onClick={()=>{
        router.push(`/a-dashboard/chat/${receiverId}`)
      }}>
        <Fab color="primary" aria-label="add" size='small'>
        <ChatIcon />
      </Fab>
      </IconButton>
  );
}