import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextField, Box, FormGroup } from "@mui/material";

function Textarea({ name, label, required, helperText, ...rest }: any) {
  return (
    <Box marginBottom={2} marginTop={2}>
      <FormGroup>
        <Field
          name={name}
          as={TextField}
          multiline
          minRows="5"
          InputLabelProps={{ shrink: true }}
          size="small"
          margin="dense"
          required={required}
          helperText={helperText}
          label={label}
          {...rest}
        />
        <ErrorMessage name={name} />
      </FormGroup>
    </Box>
  );
}

export default Textarea;
