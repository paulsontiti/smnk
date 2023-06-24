import React, { useState } from "react";
import { Field } from "formik";
import { TextField, Box, FormGroup, Typography, Button } from "@mui/material";
import CustomErrorMessage from "./CustomErrorMessage";
import emailjs from "@emailjs/browser";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

function VerifyingEmail({
  name,
  label,
  emailVerificationCode,
  required,
  helperText,
  autoComplete,
  values,
  fieldToCheckAgainst,
  valueOfFieldToCheckAgainst,
  errors,
  ...rest
}: any) {
  const [emailVerifyingMsg, setEmailVerifyingMsg] = useState("");
  const [emailInUseMsg, setEmailInUseMsg] = useState("");
  const [sendingCode, setSendingCode] = useState(false);

  function SendEmail(
    email: string,
    emailVerificationCode: string,
    setSendingCode: React.Dispatch<React.SetStateAction<boolean>>,
    setEmailVerifyingMsg: React.Dispatch<React.SetStateAction<string>>
  ) {
    setSendingCode(true);
    setEmailVerifyingMsg("");
    emailjs
      .send(
        "service_l0apj59",
        "smnk_verify_email",
        {
          to_name: email,
          message: `Your email verification code is ${emailVerificationCode}`,
          from_name: "SMNK Nig Ltd",
        },
        "X1uWzzlDGGXJyMl09"
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSendingCode(false);
          setEmailVerifyingMsg(
            "Your email verification code has been sent to your email"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setSendingCode(false);
        setEmailVerifyingMsg(
          "An error occurred while sending your verification code,Please ensure you are connected to the internet"
        );
        // SendEmail(
        //   values.email,
        //   emailVerificationCode,
        //   setSendingCode,
        //   setEmailVerifyingMsg
        // );
      });
  }
  async function CheckIfEmailIsInUse(email: string) {
    let data, error;
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/users/email-in-use/${email}`,
      });
      data = await res.data;
    } catch (err: any) {
      error = err;
    }
    return { data, error };
  }
  return (
    <Box marginBottom={2} marginTop={2}>
      <FormGroup>
        <Field
          type="email"
          name={name}
          as={TextField}
          label={label}
          required={required}
          helperText={helperText}
          autoComplete={autoComplete}
          {...rest}
          size="small"
          margin="dense"
          InputLabelProps={{ shrink: true }}
          onBlur={async (e: any) => {
            const { data, error } = await CheckIfEmailIsInUse(values.email);
            if (error) {
              setEmailInUseMsg(
                "Error occured while checking if your email is already in use,ensure you are connected or refresh this page"
              );
            }
            if (!data) {
              setEmailInUseMsg("");
              SendEmail(
                values.email,
                emailVerificationCode,
                setSendingCode,
                setEmailVerifyingMsg
              );
            } else {
              setEmailInUseMsg(
                "This email is already in use,choose another email"
              );
            }
          }}
        />
        {sendingCode && (
          <LoadingButton
            loading={sendingCode}
            size="small"
            color="primary"
            sx={{ fontSize: 10, textTransform: "capitalize" }}
            loadingPosition="start"
            variant="outlined"
          >
            sending verification code to your email
          </LoadingButton>
        )}
        {emailInUseMsg && (
          <Typography variant="caption" color="error">
            {emailInUseMsg}
          </Typography>
        )}
        {emailVerifyingMsg && (
          <>
            {" "}
            <Typography variant="caption" color="primary">
              {emailVerifyingMsg}
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Typography
                variant="caption"
                component="i"
              >{`Didn't get it?`}</Typography>
              <Button
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  SendEmail(
                    values,
                    emailVerificationCode,
                    setSendingCode,
                    setEmailVerifyingMsg
                  );
                }}
              >
                Resend
              </Button>
            </Box>
          </>
        )}
        <CustomErrorMessage name={name} />
      </FormGroup>
    </Box>
  );
}

export default VerifyingEmail;
