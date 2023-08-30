import * as React from "react";
import { IconButton } from "@mui/material";
import Fab from "@mui/material/Fab";
import StartIcon from "@mui/icons-material/Start";

export default function StartFloatingButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <IconButton onClick={handleClick}>
      <Fab color="primary" aria-label="add" size="small">
        <StartIcon />
      </Fab>
    </IconButton>
  );
}
