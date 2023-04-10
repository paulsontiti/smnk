import React from 'react'
import { Field,ErrorMessage} from "formik";
import {TextField,Box,FormGroup,FormLabel} from "@mui/material";

function FileControl({name,label,type,...rest}:any) {
  return (
    <Box marginBottom={2}  marginTop={2}>
    <FormGroup>
        <FormLabel>{label}</FormLabel>
        <Field type={type} name={name} as={TextField} {...rest}/>
        <ErrorMessage name={name}/>
    </FormGroup>
    </Box>
  )
}

export default FileControl