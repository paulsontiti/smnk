import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SubscribeToNewsLetter from "./SubscribeToNewsLetter";
import Logout from "../dashboard/logout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LogoutSwitch from "../switch/LogoutSwitch";

export default function Footer() {
  const [color, setColor] = React.useState<ColorPaletteProp>("primary");
  const {_id} = useSelector((state:RootState)=>state.users.user)
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== "warning" && {
          bgcolor: `${color}.900`,
        }),
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
          src="/assets/smnk.jpg"
          width={50}
          height={50}
          style={{ borderRadius: "50%",marginRight:'.5rem' }}
        />

        <Divider orientation="vertical" sx={{bgcolor:'white'}} />
        <IconButton variant="plain">
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton variant="plain">
          <TwitterIcon />
        </IconButton>
        <IconButton variant="plain">
          <InstagramIcon />
        </IconButton>
        <IconButton variant="plain">
          <WhatsAppIcon />
        </IconButton>
        <IconButton variant="plain">
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
    <SubscribeToNewsLetter/>
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
          <AspectRatio
            ratio="21/9"
            minHeight={80}
            sx={{ flexBasis: { xs: 200, md: "initial" } }}
          >
          
          </AspectRatio>
          <CardContent>
            <Typography level="body2">Intro to the MUI ecosystem</Typography>
            <Typography level="body3" sx={{ mb: 0.5 }}>
              MUI blog
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
            <ListSubheader>Quick Links</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>About SMNK</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Contact us</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Jobs</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Talents</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
            <ListSubheader>SMNK Products</ListSubheader>
            <List sx={{ "--ListItemDecorator-size": "32px" }}>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                  
                  </ListItemDecorator>
                  MUI Core
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    
                  </ListItemDecorator>
                  MUI X
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                  
                  </ListItemDecorator>
                  MUI Toolpad
                  <Chip
                    variant="soft"
                    size="sm"
                    sx={{ minHeight: 20, fontSize: "xs2", ml: "auto" }}
                  >
                    BETA
                  </Chip>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                
                  </ListItemDecorator>
                  Design kits
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                  
                  </ListItemDecorator>
                  Templates
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography
          level="body2"
          startDecorator={
            <Typography textColor="text.tertiary"> developed by</Typography>
          }
        >
          Black Magic Technology
        </Typography>
        <Typography
          level="body2"
          startDecorator={
            <Typography textColor="text.tertiary">powered & sponsored by</Typography>
          }
        >
          SMNK Nig Ltd
        </Typography>
        <Divider sx={{ my: 2 }} />
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <Typography level="body3" sx={{ ml: "irem" }}>
          Copyright {new Date().getFullYear()}
        </Typography>
       {_id &&  <LogoutSwitch/>}
      </Box>
      </Box>
    </Sheet>
  );
}
