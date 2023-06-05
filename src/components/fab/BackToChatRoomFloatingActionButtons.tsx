import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

export default function BackToChatRoomFloatingActionButtons({isAdmin}:{isAdmin:boolean}) {
    
    const router = useRouter()
  return (
      <IconButton onClick={()=>{
       if(isAdmin){
        router.push('/a-dashboard/chat')
       }else{
        router.push('/chat')
       }

      }}>
        <Fab color="primary" aria-label="add" size='small'>
        <ArrowBackIcon/>
      </Fab>
      </IconButton>
  );
}