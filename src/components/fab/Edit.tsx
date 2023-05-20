import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export default function EditFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <EditIcon />
      </Fab>
      </IconButton>
  );
}