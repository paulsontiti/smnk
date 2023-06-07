import { Alert,Box } from '@mui/material'
import React from 'react'

function LoadingAlert() {
    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Alert severity="info">loading......</Alert>
      </Box>
    )
}

export default LoadingAlert