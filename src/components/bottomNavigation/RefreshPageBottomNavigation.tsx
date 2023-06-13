import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/router";
import { useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function RefreshPageBottomNavigation({ label }: { label: string }) {
  const [value, setValue] = useState(0);
 
  const router = useRouter()
  return (
    <Box sx={{ width: "100%" }} mt={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
    
            <BottomNavigationAction
            label={label}
            onClick={()=>{
                router.reload()
            }}
            icon={
              <RefreshIcon 
              />
            }
          />
      </BottomNavigation>
    
    </Box>
  );
}
