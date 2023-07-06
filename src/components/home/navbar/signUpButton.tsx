import { theme } from "@/pages/_app";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function SignUpButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("/account/signup");
      }}
      sx={{
        textTransform: "capitalize",
        color: "white",
        bgcolor: theme.smnk[1000],
      }}
      variant="contained"
      size="small"
    >
      Sign Up
    </Button>
  );
}
