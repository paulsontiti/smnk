import { Button } from "@mui/material";
import { useRouter } from "next/router";
import LoginIcon from "@mui/icons-material/Login";
import { theme } from "@/pages/_app";

export default function LoginButton() {
  const router = useRouter();

  return (
    <Button
      sx={{
        textTransform: "capitalize",
        margin: "1rem .5rem",
        color: theme.smnk[1000],
      }}
      variant="outlined"
      size="small"
      onClick={() => {
        router.push("/account/login");
      }}
    >
      Login
    </Button>
  );
}
