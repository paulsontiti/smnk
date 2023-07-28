import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AccountActions from "../home/navbar/actions";
import { Grid, Typography, Box, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { theme } from "@/pages/_app";
import LogoutSwitch from "../switch/LogoutSwitch";
import DashboardDp from "../avatar/DashboardDp";

export default function HomeLogoutAppBar() {
  const router = useRouter();
  return (
    <Toolbar sx={{ bgcolor: "white" }}>
      <Grid container>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Box pt={2}>
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
          </Box>
        </Grid>
        {/* <Grid
          item
          xs={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <SearchDrawer footer={false} />
        </Grid> */}

        <Grid
          item
          xs={10}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          {" "}
          <DpAndAccounts />
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
export function DpAndAccounts() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    setUserId(_id);
  }, [_id]);
  return (
    <>
      {userId === null ? (
        <>
          <Skeleton
            variant="rectangular"
            width={100}
            height={30}
            animation="wave"
          />
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation="wave"
          />
        </>
      ) : userId ? (
        <>
          <LogoutSwitch />
          <DashboardDp />
        </>
      ) : (
        <AccountActions />
      )}
    </>
  );
}
