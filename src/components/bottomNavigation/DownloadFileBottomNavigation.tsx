import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DownloadFloatingActionButtons from "../fab/Download";

export default function DownloadFileBottomNavigation({
  handleDownloadClick
}: {
    handleDownloadClick: () => void;
}) {
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
       
        <BottomNavigationAction
          label="Download File"
          icon={
            <DownloadFloatingActionButtons handleClick={handleDownloadClick} />
          }
        />
       
      </BottomNavigation>
    </Box>
  );
}
