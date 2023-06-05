import React from 'react'
import {Box,Typography} from '@mui/material'
import {Formik,Form,Field} from 'formik'
import { object, string } from 'yup'
import Input from "@mui/joy/Input";
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios';


function SubscribeToNewsLetter() {
    const submitHandler = async (chat: string) => {
        try {
          await axios({
            method: "POST",
            url: `${process.env.SMNK_URL}/api/chat`,
            data: {  },
          });
        } catch (err) {
          console.log(err);
        }
      };
    
      //formik submit handler
      const formikSubmitHandler = (values: any, formikHelpers: any) => {
        formikHelpers.resetForm();
        return new Promise((res) => {
          formikHelpers
            .validateForm()
            .then(async (data: any) => {
              const msg = await submitHandler(values.msg);
              res(msg);
            })
            .catch((err: any) => {
              console.log("Error from formik ", err);
              res(err);
            });
        });
      };
  return (
    <Box  width={'90vw'}>
    <Formik
     validationSchema={object({  email: string().email('invalid email').required('Email is required')})}
     initialValues={{ email: "" }}
     onSubmit={formikSubmitHandler}
     enableReinitialize
   >
     {({ values }) => (
       <Form>
         <Box
           mt={'1rem'}
         >
          <Typography variant='caption'>Subscribe to our Newsletter</Typography>
           <Field
             as={Input} fullWidth
             variant="soft"
             placeholder="Your Email"
             type="email"
             name="email"
             endDecorator={
                 <SendIcon />
             }
           />
          
         
         </Box>
         {/* <pre>{JSON.stringify(errors,null,4)}</pre> */}
       </Form>
     )}
   </Formik>
  </Box>
  )
}

export default SubscribeToNewsLetter