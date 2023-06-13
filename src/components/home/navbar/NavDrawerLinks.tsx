import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HomeIcon from '@mui/icons-material/Home';

import { useRouter } from "next/router";
import { Typography } from "@mui/material";

export default function NavDrawerLinks() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openAboutSMNK, setOpenAboutSMNK] = React.useState(true);

  const router = useRouter()

  //handle aboutsmnk opening

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
      setSelectedIndex(index);
  };
  
  return (
      <Box sx={{ width: "100%", maxWidth: 360}}>
      <List component="nav" aria-label="main mailbox folders" >
      <ListItemButton sx={{ ml: 0 }} onClick={()=>{router.push('/')}}>
        <ListItemIcon><HomeIcon sx={{color:"white"}}/></ListItemIcon>
          <ListItemText primary={<Typography variant="body1">Home</Typography>} />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => {
              setOpenAboutSMNK(!openAboutSMNK);
            handleListItemClick(event, 0)
          }}
        >
          <ListItemIcon>
            <InfoIcon sx={{color:'white'}}/>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">About SMNK</Typography>} />
          {openAboutSMNK ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAboutSMNK} timeout="auto" unmountOnExit>
          <List
            component="nav"
            aria-label="secondary mailbox folder"
            sx={{ ml: 8 }}
          >
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => {
                handleListItemClick(event, 1)
                router.push('/about-us')
              }}
            >
              <ListItemIcon>
                <FeedIcon   sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="caption">About Us</Typography>} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => {
                handleListItemClick(event, 2)
                router.push('/vision')
              }}
            >
              <ListItemIcon>
                <RemoveRedEyeIcon  sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="caption">Vision</Typography>} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3)
                router.push('/mission')
              }}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon   sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="caption">Mission</Typography>} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3)
                router.push('/purpose')
              }}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon   sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="caption">Purpose</Typography>} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4)
                router.push('/team')
              }}
            >
                  <ListItemIcon>
                <Diversity3Icon   sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="caption">Our Team</Typography>} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => {
            handleListItemClick(event, 5)
            router.push('/services')
          }}
        >
          <ListItemIcon>
            <BusinessIcon   sx={{color:'white'}}/>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Services</Typography>} />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => {
            handleListItemClick(event, 6)
            router.push('/jobs')
          }}
        >
          <ListItemIcon>
            <WorkIcon   sx={{color:'white'}}/>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Jobs</Typography>} />
        </ListItemButton>
      
        {/* <ListItemButton
          selected={selectedIndex === 8}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItemButton> */}
       
        
      </List>
    </Box>
  );
}
