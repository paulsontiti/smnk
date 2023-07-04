import * as React from "react";
import { IconButton } from "@mui/material";
import Fab from "@mui/material/Fab";
import CancelIcon from "@mui/icons-material/Cancel";
import { theme } from "@/pages/_app";

export default function CancelFloatingActionButtons({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <IconButton onClick={handleClick}>
      <Fab sx={{ color: theme.smnk[1000] }} aria-label="add" size="small">
        <CancelIcon />
      </Fab>
    </IconButton>
  );
}
