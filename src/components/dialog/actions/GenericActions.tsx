import { Button, Box } from "@mui/material";

function GenericActions({
  confirmAction,
  yesLabel,
  noLabel,
}: {
  confirmAction: (confirm: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Button
        variant="outlined"
        sx={{ mr: 2 }}
        onClick={() => {
          confirmAction(true);
        }}
      >
        {yesLabel ?? "YES"}
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          confirmAction(false);
        }}
      >
        {noLabel ?? "NO"}
      </Button>
    </Box>
  );
}

export default GenericActions;
