import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EditFloatingActionButtons from "../fab/Edit";
import DeleteFloatingActionButtons from "../fab/Delete";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EditDeleteBottomNavigation({
  editHandleClick,
  deleteHandleClick,
}: {
  editHandleClick: () => void;
  deleteHandleClick: () => void;
}) {
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
          label="Edit"
          icon={
            <EditFloatingActionButtons
              handleClick={editHandleClick}
            />
          }
        />

        <BottomNavigationAction
          label="Delete"
          icon={<DeleteFloatingActionButtons handleClick={deleteHandleClick} />}
        />
      </BottomNavigation>
      {/* <pre>{JSON.stringify(jobStatus,null,4)}</pre> */}
    </Box>
  );
}
