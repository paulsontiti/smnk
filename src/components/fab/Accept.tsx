import * as React from "react";
import { IconButton } from "@mui/material";
import Fab from "@mui/material/Fab";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export default function AcceptFloatingActionButtons({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <IconButton onClick={handleClick}>
      <Fab color="primary" aria-label="add" size="small">
        <ThumbUpAltIcon />
      </Fab>
    </IconButton>
  );
}
