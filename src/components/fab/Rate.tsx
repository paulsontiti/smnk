import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import GradeIcon from '@mui/icons-material/Grade';

export default function RateFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
   
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <GradeIcon />
      </Fab>
      </IconButton>
  );
}