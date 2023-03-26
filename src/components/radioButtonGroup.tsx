
import {Radio,RadioGroup,FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

export default function RadioButtonGroup({radios,setTypeValue}:{radios:string[],setTypeValue?:(val:string)=>void}){
const [value,setValue] = useState(radios[0])

const handleEvent=(e:any)=>{
    setValue(e.target.value)
}

useEffect(()=>{
    setTypeValue ? setTypeValue(value) :  null
},[value,setTypeValue])

    return(
       <>
       <RadioGroup name="type" value={value} onChange={handleEvent}>
       {radios.map((radio,index)=>(
             <FormControlLabel key={index} value={radio} control={<Radio />} label={radio} />
        ))}
       </RadioGroup>
        
       </>
    )
}
