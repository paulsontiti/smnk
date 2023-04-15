import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export default function UploadFile({name,label,type,...rest}:any) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button  variant="contained" component="label">
        {label}
        <input name={name} hidden accept="image/*" multiple type={type} />
      </Button>
      {/* <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton> */}
    </Stack>
  );
}