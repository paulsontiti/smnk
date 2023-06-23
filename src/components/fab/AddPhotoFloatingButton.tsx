import * as React from "react";
import { IconButton } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export default function AddPhotoFloatingButton() {
  return (
    <IconButton>
      <Fab color="primary" aria-label="add" size="small">
        <AddAPhotoIcon />
      </Fab>
    </IconButton>
  );
}
