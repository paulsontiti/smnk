import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AccountActions from "../home/navbar/actions";
import DPAvatar from "../avatar/DPAvatar";
import { Grid, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { theme } from "@/pages/_app";
import Logout from "../dashboard/logout";
import SearchBox from "../autoComplete/SearchBox";
import LogoutSwitch from "../switch/LogoutSwitch";
import { DpAndAccounts } from "./HomeLogoutAppBar";

export default function DesktopHomeAppBar() {
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter();
  return (
    <Toolbar
      sx={{ pt: 2, display: "flex", flexDirection: "column", bgcolor: "white" }}
    >
      <Grid container>
        <Grid
          item
          sm={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          {/* <AppBarLogo /> */}
          <Image
            alt="SMNK Nig Ltd"
            src="/assets/smnk_logo.jpg"
            width={70}
            height={70}
            style={{ marginRight: ".5rem" }}
            onClick={() => {
              router.push("/");
            }}
          />
        </Grid>
        <Grid
          item
          sm={7}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <SearchBox />
        </Grid>
        <Grid
          item
          sm={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <DpAndAccounts />
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              setOpenAbout(!openAbout);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">About Us</Typography>}
            />
            {openAbout ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAbout} timeout="auto" unmountOnExit>
            <Box
              display={openAbout ? "block" : "none"}
              bgcolor="whitesmoke"
              minWidth={150}
              position={"absolute"}
              left={15}
              top={50}
              zIndex={99}
            >
              <ListItemButton
                onClick={(event) => {
                  router.push("/about-us");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">About SMNK</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  router.push("/vision");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Vision</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  router.push("/mission");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Mission</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  router.push("/purpose");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Purpose</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  router.push("/team");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Our Team</Typography>}
                />
              </ListItemButton>
            </Box>
          </Collapse>
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push("/services");
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">Services</Typography>}
            />
          </ListItemButton>
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push("/jobs");
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">Jobs</Typography>}
            />
          </ListItemButton>

          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push("/jobs");
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">Blog</Typography>}
            />
          </ListItemButton>
        </List>
      </Box> */}
    </Toolbar>
  );
}
function AppBarLogo() {
  const router = useRouter();
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography
        fontFamily={`'Bungee Shade', cursive`}
        fontWeight={"bold"}
        fontSize={"3rem"}
        onClick={() => {
          router.push("/");
        }}
        sx={{ color: theme.smnk[1000] }}
      >
        SMNK
      </Typography>
      <Typography
        fontFamily={`'Bungee Spice', cursive`}
        color={"primary"}
        fontWeight={"bold"}
        variant="caption"
      >
        we connect,you collect
      </Typography>
    </Box>
  );
}
