import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import PhotoCameraFloatingButton from "../fab/PhotoCameraFloatingButton";

export default function PhotoCameraBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box ml={1}>
      <BottomNavigation
        sx={{ bgcolor: "inherit" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="" icon={<PhotoCameraFloatingButton />} />
      </BottomNavigation>
    </Box>
  );
}
