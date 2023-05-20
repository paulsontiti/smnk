import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';


export default function ChatFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <ChatIcon />
      </Fab>
      </IconButton>
  );
}