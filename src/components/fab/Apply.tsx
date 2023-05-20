import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';


export default function ApplyFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
    
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <SendIcon/>
      </Fab>
      </IconButton>
  );
}