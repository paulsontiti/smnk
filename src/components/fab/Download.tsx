import * as React from 'react';
import {IconButton} from '@mui/material'
import Fab from '@mui/material/Fab';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

export default function DownloadFloatingActionButtons({handleClick}:{handleClick:()=>void}) {
    
  return (
      <IconButton onClick={handleClick}>
        <Fab color="primary" aria-label="add" size='small'>
        <DownloadForOfflineIcon />
      </Fab>
      </IconButton>
  );
}