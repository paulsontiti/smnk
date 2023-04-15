import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import {Button,Box} from '@mui/material'
import { Form, Formik} from "formik";
import FormControl from './formControl';
import {FormParams, disableFiled, getOptions} from '@/lib/form';




function FormikContainer({formParams}:{formParams:FormParams}) {
    
  return (
    <Box sx={{marginTop:'3rem'}}>
    <h4>{formParams.headerTitle}</h4>
    <Formik validationSchema={formParams.formObject.validationSchema}
            initialValues={formParams.formObject.initialValues}
             onSubmit={formParams.formObject.onSubmit}>
        {({values,errors,isSubmitting,isValid,isValidating})=>(
            <Form>
            {formParams.formObject.formControls.map((field,i)=>(
                <FormControl key={i} control={field.control} 
                            name={field.name} label={field.label}
                            type={field.type}
                            disabled={disableFiled(field.name,values[field.fieldToCheckAgainst as string] )}
                            options={getOptions(field.name,values[field.fieldToCheckAgainst as string],field.options as any[])} />
            ))}
            <LoadingButton type='submit'
                           variant='contained' 
                           fullWidth 
                           disabled={!isValid || 
                                      isValidating ||
                                       isSubmitting}
                          loading={isSubmitting}
                          
            >{formParams.buttonLabel}
            </LoadingButton>
            {/* <pre>{JSON.stringify(values,null,4)}</pre>
           <pre>{JSON.stringify(errors,null,4)}</pre> */}
           
        </Form>
        )}
         
    </Formik>
    </Box>
  )
}

export default FormikContainer