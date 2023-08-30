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
import InfoAlert from "../alerts/Info";

function FormikContainer({
  formParams,
  loading,
  note,
}: {
  formParams: FormParams;
  loading: boolean;
  note?: string;
}) {
  const router = useRouter();
  //get the current url
  const path = router.pathname;
  const loginDesign =
    formParams.buttonLabel.toLowerCase() === "signup" ||
    formParams.buttonLabel.toLowerCase() === "login";
  return (
    <SmnkErrorBoundary>
      {loginDesign && (
        <Box
          minHeight={
            formParams.buttonLabel.toLowerCase() === "signup" ? 1000 : 600
          }
          minWidth={"100%"}
          p={2}
          sx={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 50%)",
            background:
              "linear-gradient(90deg, rgba(48,191,220,1) 30%,  rgba(27,82,153,1) 100%)",
          }}
        ></Box>
      )}

      <Box
        maxWidth={"90%"}
        minWidth={{ xs: "90%", md: "50%" }}
        p={1}
        position={"absolute"}
        left={
          loginDesign
            ? { xs: 1, md: 100, lg: 200 }
            : { xs: 10, md: 300, lg: 400 }
        }
        top={loginDesign ? 250 : 150}
        color={theme.smnk[1200]}
        display={"flex"}
        justifyContent={"center"}
        gap={{ xs: 1, sm: 5, md: 10 }}
      >
        {loginDesign && (
          <BlackImage width={100} height={100} src="/assets/smnk.png" alt="" />
        )}

        <Box
          minWidth={loginDesign ? "70%" : "100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
        >
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
                  >
                    {formParams.buttonLabel}
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
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
          {note && <InfoAlert message={note} />}
        </Box>
      </Box>
    </SmnkErrorBoundary>
  );
}

export default FormikContainer;
