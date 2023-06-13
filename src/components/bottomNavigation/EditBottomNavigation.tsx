import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import EditFloatingActionButtons from "../fab/Edit";

export default function EditBottomNavigation({ label,handleClick }: { label: string,handleClick:()=>void }) {
  const [value, setValue] = useState(0);
 
  return (
    <Box  mt={1}>
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
              <EditFloatingActionButtons
                handleClick={handleClick}
              />
            }
          />
      </BottomNavigation>
    
    </Box>
  );
}
