import { theme } from "@/pages/_app";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updatePageLoading } from "@/store/slices/userSlice";

export default function SignUpButton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Button
      onClick={() => {
        dispatch(updatePageLoading(true));
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
