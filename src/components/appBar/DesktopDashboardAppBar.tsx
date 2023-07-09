import { Grid, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ChatNotification from "../chat/ChatNotification";
import { useRouter } from "next/router";
import Image from "next/image";
import DashBoardNotification from "../dashboard/DashBoardNotification";

export default function DesktopDashboardAppBar() {
  const router = useRouter();
  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid container>
          <Grid
            item
            md={4}
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
          <Grid
            item
            md={8}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <ChatNotification /> <DashBoardNotification />
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
}
