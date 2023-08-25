import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchDrawer from "../drawer/SearchDrawer";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SmnkErrorBoundary, theme } from "@/pages/_app";

export default function SearchBox() {
  const [value, setValue] = React.useState("Jobs");
  const [open, setOpen] = React.useState(false);
  return (
    <SmnkErrorBoundary>
      <Box
        sx={{ minWidth: 500, maxWidth: "100%" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <SearchDrawer searchOption={value} />
        <List>
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">Jobs</Typography>}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              display={open ? "block" : "none"}
              bgcolor="whitesmoke"
              minWidth={150}
              position={"absolute"}
              left={15}
              top={50}
              zIndex={99}
              color={theme.smnk[1200]}
            >
              <ListItemButton
                onClick={(event) => {
                  setValue("Jobs");
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Jobs</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  setValue("Services");
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Services</Typography>}
                />
              </ListItemButton>
            </Box>
          </Collapse>
        </List>
      </Box>
    </SmnkErrorBoundary>
  );
}
