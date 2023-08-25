import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AcceptFloatingActionButtons from "../fab/Accept";
import ChatFloatingActionButtons from "../fab/Chat";
import RejectFloatingActionButtons from "../fab/Reject";

export default function ProposalActionsBottomNavigation({
  receiverId,
  handleApproveClick,
  handleRejectClick,
}: {
  receiverId: string;
  handleApproveClick: () => void;
  handleRejectClick: () => void;
}) {
  const [value, setValue] = React.useState(0);

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
          label="Chat"
          icon={<ChatFloatingActionButtons receiverId={receiverId} />}
        />
        <BottomNavigationAction
          label="Accept"
          icon={
            <AcceptFloatingActionButtons handleClick={handleApproveClick} />
          }
        />
        {/* <BottomNavigationAction
          label="Reject"
          icon={
            <RejectFloatingActionButtons handleClick={handleRejectClick} />
          }
        /> */}
      </BottomNavigation>
    </Box>
  );
}
