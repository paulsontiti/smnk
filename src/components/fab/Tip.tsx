import CoffeeIcon from '@mui/icons-material/Coffee';
import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';

export default function TipFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
    
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <CoffeeIcon/>
      </Fab>
      </IconButton>
  );
}