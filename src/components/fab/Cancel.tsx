import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import CancelIcon from '@mui/icons-material/Cancel';

export default function CancelFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
    
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <CancelIcon/>
      </Fab>
      </IconButton>
  );
}