import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';


export default function ComplainFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <SentimentDissatisfiedIcon />
      </Fab>
      </IconButton>
  );
}