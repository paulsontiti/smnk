import { Box } from "@mui/material";
import LoginButton from "./loginButton";
import SignUpButton from "./signUpButton";

export default function AccountActions() {
  return (
    <Box>
      <LoginButton />
      <SignUpButton />
    </Box>
  );
}
