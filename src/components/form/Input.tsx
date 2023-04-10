import React from 'react'
import { FastField,ErrorMessage} from "formik";
import {TextField,Box,FormGroup} from "@mui/material";


function Input({name,label,type,...rest}:any) {
  return (
    <Box marginBottom={2}  marginTop={2}>
    <FormGroup>
        <FastField type={type} name={name} as={TextField} label={label} {...rest}/>
        <ErrorMessage name={name}/>
    </FormGroup>
    </Box>
  )
}

export default Input