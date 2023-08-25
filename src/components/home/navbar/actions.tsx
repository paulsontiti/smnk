import { Box } from "@mui/material";
import BlackLoadingButton from "./loginButton";

export default function AccountActions() {
  return (
    <Box>
      <BlackLoadingButton
        label="Login"
        url="/account/login"
        variant="outlined"
      />
      <BlackLoadingButton
        label="Sign Up"
        url="/account/signup"
        variant="contained"
      />
    </Box>
  );
}
