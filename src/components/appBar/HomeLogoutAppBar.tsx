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
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import Notification from "../dashboard/Notification";
import ThemeContainer from "../theme/ThemeContainer";

export default function HomeLogoutAppBar() {
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter();
  return (
    <ThemeContainer>
      <Toolbar>
        <Grid container>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <NavbarDrawer />
          </Grid>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              alt="SMNK Nig Ltd"
              src="/assets/smnk.png"
              width={50}
              height={50}
              style={{ borderRadius: "50%", marginRight: ".5rem" }}
              onClick={() => {
                router.push("/");
              }}
            />
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
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Notification />
          </Grid>
          <Grid
            item
            xs={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {user && user._id ? (
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
            ) : (
              <AccountActions />
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </ThemeContainer>
  );
}
