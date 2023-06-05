
import BottomNavigation from "@mui/material/BottomNavigation";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Send } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import axios from "axios";
import { object, string } from "yup";
import { useState } from "react";

export default function ChatSendBoxBottonNavigation({senderId,receiverId}:{senderId:string,receiverId:string}) {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
       <SendBox senderId={senderId} receiverId={receiverId}/>
       
      </BottomNavigation>
    </Box>
  );
}
function SendBox({
    senderId,
    receiverId,
  }: {
    senderId: string;
    receiverId: string;
  }) {
    const submitHandler = async (chat: string) => {
      try {
        await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/chat`,
          data: { senderId, receiverId, chat },
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
      <Formik
        validationSchema={object({ msg: string().required() })}
        initialValues={{ msg: "" }}
        onSubmit={formikSubmitHandler}
        enableReinitialize
      >
        {({ handleBlur, errors, values }) => (
          <Form>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              borderRadius={20}
              border={"1px solid blue"}
              mt={5}
            >
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <Field
                as={TextField} fullWidth
                name="msg"
                variant="standard"
                multiline
                placeholder="type your message"
              />
             
              {values.msg && (
                <>
                 <Button
                size="small"
                endIcon={<RestartAltIcon />}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                type="reset"
              ></Button>
                <Button
                  size="small"
                  endIcon={<Send />}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  type="submit"
                ></Button>
                </>
              )}
            </Box>
            {/* <pre>{JSON.stringify(errors,null,4)}</pre> */}
          </Form>
        )}
      </Formik>
    );
  }