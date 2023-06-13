import * as React from 'react';
import {FormControlLabel,Switch,Box} from '@mui/material';
import { Field} from "formik";
import CustomErrorMessage from './CustomErrorMessage';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function SwitchComponent({values,name,checked,label,helperText,...rest}:any) {
  return (
    <>
        <Box>
            <Field  name={name}
                    as={FormControlLabel}
                    control={<Switch checked={values[name]}/>}
                    label={label}
                    labelPlacement="start"
            />
        </Box> 

        <CustomErrorMessage name={name}/>
    </>
  );
}