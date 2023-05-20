import React, { useEffect, useState } from 'react'
import { Field,ErrorMessage} from "formik";
import {TextField,Box,FormGroup,FormLabel, IconButton} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';

function FileControl({name,label,...rest}:any) {

  const [file, setFile] = useState<any>();

  const handleChange = (e:any,form:any) => {
    const file = e.target.files[0];
    form.values[name] = file
    setFile(file);
  };

  return (
    <Box marginBottom={2}  marginTop={2}>
   <Field name={name}>
    {
      (props:any)=>{
        const {form} = props
        return(
          <FormGroup>
          <IconButton color="primary" aria-label="upload picture" component="label">
          {
            file ? <FormLabel>{file.name}</FormLabel>: <FormLabel>{label}</FormLabel>
          }
          <AttachFileIcon/>
          <input
            onChange={(e:any)=>handleChange(e,form)}
            hidden
            type="file"
          />
          </IconButton>
          <ErrorMessage name={name}/>
      </FormGroup>
        )
      }
    }
   </Field>
    </Box>
  )
}

export default FileControl