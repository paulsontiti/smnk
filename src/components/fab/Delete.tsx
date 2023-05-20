import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
    
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <DeleteIcon />
      </Fab>
      </IconButton>
  );
}