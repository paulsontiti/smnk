import React from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { Form, Formik } from "formik";
import FormControl from "./formControl";
import { FormParams, getOptions } from "@/lib/form";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function FormikContainer({ formParams }: { formParams: FormParams }) {
  return (
    <Box
      maxWidth={"98%"}
      sx={{
        p: {
          xs: "3rem 1rem",
          sm: "5rem",
          md: "5rem 15rem",
          lg: "5rem 25rem",
          xl: "5rem 25rem",
        },
      }}
    >
      <Typography>{formParams.headerTitle}</Typography>
      <Formik
        validationSchema={formParams.formObject.validationSchema}
        initialValues={formParams.formObject.initialValues}
        onSubmit={formParams.formObject.onSubmit}
        enableReinitialize
      >
        {({ values, touched, isSubmitting, isValid, isValidating, errors }) => (
          <Form>
            {formParams.formObject.formControls.map((field, i) => (
              <FormControl
                key={i}
                emailVerificationCode={field.emailVerificationCode}
                control={field.control}
                name={field.name}
                label={field.label}
                type={field.type}
                checked={field.checked}
                checkedValue={field.checkedValue}
                fieldToCheckAgainst={field.fieldToCheckAgainst}
                values={values}
                errors={errors}
                touched={touched}
                required={field.required}
                helperText={field.helperText}
                autoComplete={field.autoComplete}
                url={field.url}
                valueOfFieldToCheckAgainst={field.valueOfFieldToCheckAgainst}
                options={getOptions(
                  field.name,
                  values[field.fieldToCheckAgainst as string],
                  field.options as any[]
                )}
              />
            ))}

            <Box
              mt={"1rem"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isValidating || isSubmitting}
                endIcon={formParams.endIcon}
                startIcon={formParams.startIcon}
                size="small"
              >
                {formParams.buttonLabel}
              </Button>
              <Button
                type="reset"
                variant="outlined"
                size="small"
                startIcon={<RestartAltIcon />}
              >
                Reset
              </Button>
            </Box>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isSubmitting}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {/* <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>{JSON.stringify(errors, null, 4)}</pre> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default FormikContainer;
