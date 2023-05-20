import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AcceptFloatingActionButtons from "../fab/Accept";
import EditFloatingActionButtons from "../fab/Edit";
import ComplainFloatingActionButtons from "../fab/Complain";

export default function ClientReportAction({
  handleApproveClick,handleCorrectionClick,handleComplainClick,
}: {
  handleApproveClick: () => void;
  handleCorrectionClick: () => void,
  handleComplainClick: () => void;
}) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
       
        <BottomNavigationAction
          label="Approve"
          icon={
            <AcceptFloatingActionButtons handleClick={handleApproveClick} />
          }
        />
        <BottomNavigationAction
          label="Correct"
          icon={<EditFloatingActionButtons handleClick={handleCorrectionClick}/>}
        />
        <BottomNavigationAction
          label="Complain"
          icon={<ComplainFloatingActionButtons handleClick={handleComplainClick} />}
        />
      </BottomNavigation>
    </Box>
  );
}
