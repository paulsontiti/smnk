import React from 'react'
import { Field,ErrorMessage} from "formik";
import {Box,FormGroup} from "@mui/material";


function DropdownMenu({name,label,options,...rest}:
                            {name:string,
                            label:string,
                            options:any[],
                            }) {
  return (
    <Box marginBottom={2}  marginTop={2}>
    <FormGroup>
      <label>{label}</label>
        <Field key={name} name={name} as='select'  {...rest} style={{height:'50px'}}>
        <option value=''>Select .......</option>
            {
               Array.isArray(options) && options.map((opt)=>(
                    <option key={opt.label} value={opt.label}>{opt.label}</option>
                ))
            }
        </Field>
        <ErrorMessage name={name}/>
    </FormGroup>
    </Box>
  )
}

export default DropdownMenu