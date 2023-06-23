
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { Box } from "@mui/material";
import CaptureImageFloatingButton from "../fab/CaptureImageFloatingButton";

export default function CaptureBottomNavigation({ label,handleClick }: { label: string,handleClick:()=>void }) {
  const [value, setValue] = useState(0);
 
  return (
    <Box sx={{ width: "100%" }} mt={1}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
    
            <BottomNavigationAction
            label={label}
            icon={
               <CaptureImageFloatingButton handleClick={handleClick}/>
            }
          />
      </BottomNavigation>
    
    </Box>
  );
}
