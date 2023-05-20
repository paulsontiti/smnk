import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import PaymentIcon from '@mui/icons-material/Payment';

export default function PayFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
    
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <PaymentIcon />
      </Fab>
      </IconButton>
  );
}