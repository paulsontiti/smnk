import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Form, Formik } from "formik";
import FormControl from "./formControl";
import { FormParams, getOptions } from "@/lib/form";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Link from "next/link";
import { useRouter } from "next/router";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import { BlackImage } from "../avatar/DashboardDp";

function FormikContainer({
  formParams,
  loading,
}: {
  formParams: FormParams;
  loading: boolean;
}) {
  const router = useRouter();
  //get the current url
  const path = router.pathname;
  return (
    <SmnkErrorBoundary>
      {(formParams.buttonLabel.toLowerCase() === "signup" ||
        formParams.buttonLabel.toLowerCase() === "login") && (
        <Box
          minHeight={
            formParams.buttonLabel.toLowerCase() === "signup" ? 800 : 400
          }
          minWidth={"100%"}
          p={2}
          sx={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 35%)",
            bgcolor: "#85A5EA",
          }}
        ></Box>
      )}

      <Box
        minWidth={"100%"}
        mt={5}
        p={1}
        position={"absolute"}
        top={200}
        color={theme.smnk[1200]}
        display={"flex"}
        justifyContent={"center"}
        gap={{ xs: 1, sm: 5, md: 10, lg: 20 }}
      >
        {(formParams.buttonLabel.toLowerCase() === "signup" ||
          formParams.buttonLabel.toLowerCase() === "login") && (
          <BlackImage width={100} height={100} src="/assets/smnk.png" alt="" />
        )}

        <Box minWidth={"70%"}>
          <Typography mb={2}>{formParams.headerTitle}</Typography>
          <Formik
            validationSchema={formParams.formObject.validationSchema}
            initialValues={formParams.formObject.initialValues}
            onSubmit={formParams.formObject.onSubmit}
            enableReinitialize
          >
            {({
              values,
              touched,
              isSubmitting,
              isValid,
              isValidating,
              errors,
            }) => (
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
                    valueOfFieldToCheckAgainst={
                      field.valueOfFieldToCheckAgainst
                    }
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
                    disabled={loading || isSubmitting || isValidating}
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
                {path === "/account/login" && (
                  <Link href="/account/forgotpassword">forgot password?</Link>
                )}

                {/* <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>{JSON.stringify(errors, null, 4)}</pre> */}
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </SmnkErrorBoundary>
  );
}

export default FormikContainer;
