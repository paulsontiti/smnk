import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DeleteFloatingActionButtons from "../fab/Delete";
import { useState } from "react";
import UploadFloatingBotton from "../fab/UploadFloatingBotton";
import { LoadingButton } from "@mui/lab";

export default function DeleteUploadImageBottomNavigation({
  deleteHandleClick,
  uploadHandleClick,
  uploading,
}: {
  deleteHandleClick: () => void;
  uploadHandleClick: () => void;
  uploading: boolean;
}) {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      sx={{ m: "1rem 0" }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      {uploading && (
        <LoadingButton
          loading={uploading}
          loadingPosition="start"
        ></LoadingButton>
      )}
      {!uploading && (
        <BottomNavigationAction
          label="Delete"
          icon={<DeleteFloatingActionButtons handleClick={deleteHandleClick} />}
        />
      )}
      {!uploading &&  <BottomNavigationAction
        label="Upload"
        icon={<UploadFloatingBotton handleClick={uploadHandleClick} />}
      />}
    </BottomNavigation>
  );
}
