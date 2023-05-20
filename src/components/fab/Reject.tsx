import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export default function RejectFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
    
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <ThumbDownAltIcon />
      </Fab>
      </IconButton>
  );
}