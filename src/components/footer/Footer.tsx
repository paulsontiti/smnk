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

export default function Footer() {
  const [color, setColor] = React.useState<ColorPaletteProp>("primary");
  const {_id} = useSelector((state:RootState)=>state.users.user)
  const router = useRouter()
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
       bgcolor:'#04023B',
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
          onClick={()=>{
            router.push('/')
          }}
        />

        <Divider orientation="vertical" sx={{bgcolor:'white'}} />
        <IconButton variant="plain" sx={{color:'white'}} onClick={()=>{
          window.location.href = 'https://www.facebook.com/smnkLTD'
        }}>
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton variant="plain"  sx={{color:'white'}} onClick={()=>{
          window.location.href = 'https://twitter.com/SMNKservicehub?t=15Dcj5Anh9NyTQnAw8f6fA&s=08'
        }}>
          <TwitterIcon />
        </IconButton>
        <IconButton variant="plain"  sx={{color:'white'}} onClick={()=>{
          window.location.href = 'https://www.instagram.com/smnkservicehub/'
        }}>
          <InstagramIcon />
        </IconButton>
        {/* <IconButton variant="plain">
          <WhatsAppIcon />
        </IconButton> */}
        <IconButton variant="plain" sx={{color:'white'}}  onClick={()=>{
          window.location.href = 'https://www.linkedin.com/company/smnk-limited-nigeria/'
        }}>
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
          {/* <AspectRatio
            ratio="21/9"
            minHeight={80}
            sx={{ flexBasis: { xs: 200, md: "initial" } }}
          >
          Hello
          </AspectRatio> */}
          <CardContent>
            <Typography level="body2">Contact Details:</Typography>
            <Typography level="body3" sx={{ mb: 0.5 }}>
            Office address: No 2 Lucky Nwagwu street, Lugbe, Abuja
            </Typography>
            <Typography level="body3" sx={{ mb: 0.5 }}>
            Email: info@smnklimited.com
            </Typography>
            <Typography level="body3" sx={{ mb: 0.5 }}>
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
            <ListSubheader sx={{color:'white'}} >Quick Links</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton onClick={()=>{
                  router.push('/about-us')
                }}><Typography level="body4">About SMNK</Typography></ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={()=>{
                  router.push('/services')
                }}><Typography level="body4">Services</Typography></ListItemButton>
              </ListItem>
              {/* <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem> */}
              <ListItem>
                <ListItemButton  onClick={()=>{
                  router.push('/jobs')
                }}><Typography level="body4">Jobs</Typography></ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        <SearchDrawer footer={true}/>
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
       
        <Typography
          level="body4"
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
