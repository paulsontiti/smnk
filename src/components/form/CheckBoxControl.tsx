
import React from 'react'
import {ErrorMessage, Field} from "formik";
import {Box,Checkbox} from "@mui/material";


function CheckBoxControl({name,label,...rest}:any) {
  return (
    <Box  marginBottom={2}>
        <Field id={name} name={name}  as={Checkbox}/>
        <label htmlFor={name}>{label}</label>

        {/* <FormGroup>
            <FormControlLabel
            control={
                <Checkbox checked={agree} onChange={(e:any)=>{setAgree(e.target.checked)}} name={name} />
            }
            label={label}
            />
        </FormGroup> */}
    </Box>
  )
}

export default CheckBoxControl