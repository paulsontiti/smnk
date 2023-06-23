import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';

import PhotoCamera from "@mui/icons-material/PhotoCamera";


export default function CaptureImageFloatingButton({handleClick}:{handleClick:()=>void}) {
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
                <PhotoCamera/>
      </Fab>
      </IconButton>
  );
}