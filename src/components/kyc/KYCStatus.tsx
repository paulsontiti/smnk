import { Box,Typography,Grid} from '@mui/material'
import React from 'react'

function KYCStatus() {
  return (
    <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} mt={2}>
      <Grid item xs={6}>
        <Box>
            <Typography>ID verification</Typography>
            <Box minWidth={'100%'} height={5} borderRadius={'20%'} bgcolor={'red'}></Box>
        </Box>

      </Grid>
     
    </Grid>
  )
}

export default KYCStatus