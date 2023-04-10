import React from 'react'
import { Field,ErrorMessage} from "formik";
import {TextField,Box,FormGroup} from "@mui/material";


function Textarea({name,label,...rest}:any) {

  return (
    <Box marginBottom={2}  marginTop={2}>
    <FormGroup>
        <Field name={name} as={TextField} multiline minRows='5' label={label} {...rest}/>
        <ErrorMessage name={name}/>
    </FormGroup>
    </Box>
  )
}

export default Textarea