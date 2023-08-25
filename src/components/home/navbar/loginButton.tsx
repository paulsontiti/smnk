import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

export default function BlackLoadingButton({
  label,
  variant,
  url,
  handleClick,
}: {
  label: string;
  variant: "text" | "outlined" | "contained";
  url?: string;
  handleClick?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const shouldLoad = router.pathname === url;
  return (
    <LoadingButton
      loading={loading}
      loadingPosition="start"
      color="primary"
      sx={{
        textTransform: "capitalize",
        margin: "1rem .5rem",
      }}
      variant={variant}
      size="small"
      onClick={() => {
        setLoading(!shouldLoad);
        url && router.push(url);
        handleClick && handleClick();
      }}
    >
      {label}
    </LoadingButton>
  );
}
