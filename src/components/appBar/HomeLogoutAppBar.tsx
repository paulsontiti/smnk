import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AccountActions from "../home/navbar/actions";
import NavbarDrawer from "../home/navbar/navBarDrawer";
import SearchDrawer from "../drawer/SearchDrawer";
import DPAvatar from "../avatar/DPAvatar";
import { Grid, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { theme } from "@/pages/_app";

export default function HomeLogoutAppBar() {
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter();
  return (
    <Toolbar>
      <Grid container>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <NavbarDrawer />
        </Grid>
        <Grid
          item
          xs={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <AppBarLogo />
          {/* <Image
              alt="SMNK Nig Ltd"
              src="/assets/smnk.png"
              width={50}
              height={50}
              style={{ borderRadius: "50%", marginRight: ".5rem" }}
              onClick={() => {
                router.push("/");
              }}
            /> */}
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <SearchDrawer footer={false} />
        </Grid>

        <Grid
          item
          xs={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {user && user._id && (
            <IconButton
              onClick={() => {
                if (user.type === "skilled worker") {
                  router.push("/sw-dashboard");
                } else {
                  router.push("/c-dashboard");
                }
              }}
            >
              <DPAvatar dp={user.dpFileName} />
            </IconButton>
          )}
          {!user._id && <AccountActions />}
        </Grid>
      </Grid>
    </Toolbar>
  );
}
export function AppBarLogo() {
  const router = useRouter();
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography
        fontFamily={`'Bungee Shade', cursive`}
        fontWeight={"bold"}
        fontSize={"2rem"}
        onClick={() => {
          router.push("/");
        }}
        sx={{ color: theme.smnk[1000] }}
      >
        SMNK
      </Typography>
      <Typography fontFamily={`'Bungee Spice', cursive`} fontSize={".4rem"}>
        we connect,you collect
      </Typography>
    </Box>
  );
}
