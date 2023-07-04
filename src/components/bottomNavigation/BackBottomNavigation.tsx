import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import BackToHistoryFloatingActionButtons from "../fab/BackFloatingButton";

export default function BackToHistoryBottomNavigation() {
  const [value, setValue] = useState(0);
  return (
    <Box position={"fixed"} bottom={100} right={5} zIndex={99}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ bgcolor: "inherit" }}
      >
        <BottomNavigationAction
          label="Go Back"
          icon={<BackToHistoryFloatingActionButtons />}
        />
      </BottomNavigation>
    </Box>
  );
}
