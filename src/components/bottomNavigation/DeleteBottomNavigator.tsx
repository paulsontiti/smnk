import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DeleteFloatingActionButtons from "../fab/Delete";
import { useState } from "react";

export default function DeleteCatalogBottomNavigation({
  deleteHandleClick,
}: {
  deleteHandleClick: () => void;
}) {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Delete"
        icon={<DeleteFloatingActionButtons handleClick={deleteHandleClick} />}
      />
    </BottomNavigation>
  );
}
