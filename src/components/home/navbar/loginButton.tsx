import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { theme } from "@/pages/_app";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updatePageLoading } from "@/store/slices/userSlice";

export default function LoginButton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
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
        dispatch(updatePageLoading(true));
        router.push("/account/login");
      }}
    >
      Login
    </Button>
  );
}
