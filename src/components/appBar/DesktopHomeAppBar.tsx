import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import SearchBox from "../autoComplete/SearchBox";
import { DpAndAccounts } from "./HomeLogoutAppBar";

export default function DesktopHomeAppBar() {
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
    </Toolbar>
  );
}
