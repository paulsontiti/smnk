import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function AddFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <AddIcon />
      </Fab>
      </IconButton>
  );
}