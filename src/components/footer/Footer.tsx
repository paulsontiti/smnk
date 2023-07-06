import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Image from "next/image";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { RootState } from "@/store";
import LogoutSwitch from "../switch/LogoutSwitch";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SearchDrawer from "../drawer/SearchDrawer";
import axios from "axios";

export default function Footer() {
  const [color, setColor] = React.useState<ColorPaletteProp>("primary");
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [totalNumberOfProfessionals, setTotalNumberOfProfessionals] =
    React.useState<number | null>(null);
  const [totalNumberOfJobs, setTotalNumberOfJobs] = React.useState<
    number | null
  >(null);
  const [totalNumberOfServices, setTotalNumberOfServices] = React.useState<
    number | null
  >(null);
  const [totalNumberOfClients, setTotalNumberOfClients] = React.useState<
    number | null
  >(null);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${process.env.SMNK_URL}api/services`,
        });
        const data = await res.data;
        //data has {servicesCount,jobsCount,profCount,clientCount}
        setTotalNumberOfProfessionals(data.profCount);
        setTotalNumberOfJobs(data.jobsCount);
        setTotalNumberOfServices(data.servicesCount);
        setTotalNumberOfClients(data.clientCount);
      } catch (err: any) {
        console.log(err);
        return err;
      }
    })();
  }, []);
  return (
    <Sheet
      variant="solid"
      invertedColors
      sx={{
        bgcolor: "#E08300",
        color: "black",
        flexGrow: 1,
        p: 2,
        mx: -3,
        my: -3,
        borderRadius: { xs: 0, sm: "xs" },
        margin: "3rem 0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
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

        <Divider orientation="vertical" sx={{ bgcolor: "black" }} />
        <IconButton
          variant="plain"
          sx={{ color: "black" }}
          onClick={() => {
            window.location.href = "https://www.facebook.com/smnkLTD";
          }}
        >
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton
          variant="plain"
          sx={{ color: "black" }}
          onClick={() => {
            window.location.href =
              "https://twitter.com/SMNKservicehub?t=15Dcj5Anh9NyTQnAw8f6fA&s=08";
          }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          variant="plain"
          sx={{ color: "black" }}
          onClick={() => {
            window.location.href = "https://www.instagram.com/smnkservicehub/";
          }}
        >
          <InstagramIcon />
        </IconButton>
        {/* <IconButton variant="plain">
          <WhatsAppIcon />
        </IconButton> */}
        <IconButton
          variant="plain"
          sx={{ color: "black" }}
          onClick={() => {
            window.location.href =
              "https://www.linkedin.com/company/smnk-limited-nigeria/";
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Card
          variant="soft"
          size="sm"
          sx={{
            flexDirection: { xs: "row", md: "column" },
            minWidth: { xs: "100%", md: "auto" },
            gap: 1,
          }}
        >
          <CardContent>
            <Typography
              level="body1"
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              Contact Details:
            </Typography>
            <Typography level="body1" sx={{ color: "black", mb: 0.5 }}>
              Office address: No 2 Lucky Nwagwu street, Lugbe, Abuja
            </Typography>
            <Typography level="body1" sx={{ color: "black", mb: 0.5 }}>
              Email: info@smnklimited.com
            </Typography>
            <Typography level="body1" sx={{ color: "black", mb: 0.5 }}>
              Phone: 09048164462
            </Typography>
          </CardContent>
        </Card>

        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, "--ListItem-radius": "8px" }}
        >
          <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
            {/* <ListSubheader sx={{ color: "black" }}>Quick Links</ListSubheader> */}
            <List>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/about-us");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    About SMNK
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/vision");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    Our Vision
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/mission");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    Our Mission
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/purpose");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    Our Purpose
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/team");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    Our Team
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
            <ListSubheader
              sx={{ color: "black", fontSize: "1rem", fontWeight: "bold" }}
            >
              Quick Links
            </ListSubheader>
            <List>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/services");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    Services
                  </Typography>
                </ListItemButton>
              </ListItem>
              {/* <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem> */}
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/jobs");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    Jobs
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/jobs");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    Why you should choose SMNK
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push("/jobs");
                  }}
                >
                  <Typography level="body2" sx={{ color: "black" }}>
                    How to find Professionals/Artisans
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
      <Divider sx={{ my: 2, color: "black" }} />
      <Box
        sx={{
          display: "flex",
          //flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          level="body2"
          sx={{ color: "black" }}
        >{`Services(${totalNumberOfServices})`}</Typography>
        <Typography
          level="body2"
          sx={{ color: "black" }}
        >{`Jobs(${totalNumberOfJobs})`}</Typography>
        <Typography
          level="body2"
          sx={{ color: "black" }}
        >{`Professionals(${totalNumberOfProfessionals})`}</Typography>
        <Typography
          level="body2"
          sx={{ color: "black" }}
        >{`Clients(${totalNumberOfClients})`}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography
          level="body2"
          sx={{ color: "black" }}
          startDecorator={
            <Typography textColor="text.tertiary" sx={{ color: "black" }}>
              Powered & Sponsored by
            </Typography>
          }
        >
          SMNK Nig Ltd
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography level="body3" sx={{ ml: "irem", color: "black" }}>
            Copyright {new Date().getFullYear()}
          </Typography>
          {_id && <LogoutSwitch />}
        </Box>
      </Box>
    </Sheet>
  );
}
