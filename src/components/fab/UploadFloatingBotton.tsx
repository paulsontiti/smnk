import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';

import UploadIcon from "@mui/icons-material/Upload";

export default function UploadFloatingBotton({handleClick}:{handleClick:()=>void}) {
    
  return (
    
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
            <UploadIcon />
          </Fab>
       
       
      </IconButton>
  );
}