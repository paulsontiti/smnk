import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/router";
import { useState } from "react";
import ApplyFloatingActionButtons from "../fab/Apply";

export default function ApplyBottomNavigation({ jobId }: { jobId: string }) {
  const [value, setValue] = useState(0);
  const router = useRouter();
 
  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
    
            <BottomNavigationAction
            label="Apply"
            icon={
              <ApplyFloatingActionButtons
                handleClick={async () => {
                    router.push(`/sw-dashboard/job/${jobId}`);
                }}
              />
            }
          />
      </BottomNavigation>
      {/* <pre>{JSON.stringify(jobStatus,null,4)}</pre> */}
    </Box>
  );
}
