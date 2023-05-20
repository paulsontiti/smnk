import React from 'react'
import { Field,ErrorMessage} from "formik";
import {Box,FormGroup,TextField,MenuItem} from "@mui/material";


function DropdownMenu({name,label,options,required,helperText,...rest}:
                            {name:string,required:boolean,
                            label:string,helperText:string,
                            options:any[],
                            }) {
  return (
    <Box marginBottom={2}  marginTop={2}>
    <FormGroup>
      <label>{label}</label>
        <Field name={name}
               as='select' required={required}
               helperText={helperText} style={{height:'50px'}}
               {...rest} margin='dense'>
            {
               Array.isArray(options) && options.map((opt)=>(
                <option key={opt.label}
                          value={opt.label}
                >
                {opt.label}
              </option>
                ))
            }
        </Field>
        <ErrorMessage name={name}/>
    </FormGroup>
    </Box>
  )
}

export default DropdownMenu