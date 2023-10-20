import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import ChatFloatingActionButtons from "../fab/Chat";

export default function ChatBottomNavigation({
  receiverId,
}: {
  receiverId: string;
}) {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100%" }} mb={5} mt={5}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Chat Client"
          icon={<ChatFloatingActionButtons receiverId={receiverId} />}
        />
      </BottomNavigation>
    </Box>
  );
}
