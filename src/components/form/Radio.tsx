import React,{useState} from 'react'
import { Field,ErrorMessage} from "formik";
import {Box,Radio,RadioGroup} from "@mui/material";


function RadioControl({name,label,options,...rest}:any) {
  const [fieldValue,setFieldValue] = useState(options[0].key)
  return (
    <Box  marginBottom={2}>
      <h5>{label}</h5>
      <Field>
        {
            ()=>{
               return  <RadioGroup name={name} value={fieldValue} onChange={(e)=>setFieldValue(e.target.value)}>
                {
         
                    Array.isArray(options) && options.map((opt)=>(
                        <Box key={opt.key} sx={{display:'flex', alignItems:'center',justifyContent:'flex-start'}}>
                             <Field id={opt.key} value={opt.value} as={Radio}/>
                             <label htmlFor={opt.key}>{opt.key}</label>
                         </Box>
                     ))
                 }
             </RadioGroup>
            }
        }
      </Field>
      {/* <Field>
        {
            ({field}:{field:any})=>{
              console.log(field)
               return  <RadioGroup name={name} value={field.value.type}>
                {
         
                    Array.isArray(options) && options.map((opt)=>(
                        <Box sx={{display:'flex', alignItems:'center',justifyContent:'flex-start'}}>
                             <Field id={opt.key} value={opt.value} as={Radio}/>
                             <label htmlFor={opt.key}>{opt.key}</label>
                         </Box>
                     ))
                 }
             </RadioGroup>
            }
        }
      </Field> */}
    </Box>
  )
}

export default RadioControl