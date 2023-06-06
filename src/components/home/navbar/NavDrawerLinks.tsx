import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import GavelIcon from "@mui/icons-material/Gavel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useRouter } from "next/router";

export default function NavDrawerLinks() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openAboutSMNK, setOpenAboutSMNK] = React.useState(false);

  const router = useRouter()

  //handle aboutsmnk opening

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
      setSelectedIndex(index);
  };
  
  return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => {
              setOpenAboutSMNK(!openAboutSMNK);
            handleListItemClick(event, 0)
          }}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About SMNK" sx={{ mr: "2rem" }} />
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
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => {
                handleListItemClick(event, 2)
                router.push('/vision')
              }}
            >
              <ListItemIcon>
                <RemoveRedEyeIcon />
              </ListItemIcon>
              <ListItemText primary="Vision" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3)
                router.push('/mission')
              }}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary="Mission" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3)
                router.push('/purpose')
              }}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary="Purpose" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4)
                router.push('/team')
              }}
            >
                  <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Our Team" />
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
            <MiscellaneousServicesIcon />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => {
            handleListItemClick(event, 6)
            router.push('/jobs')
          }}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItemButton>
      
        <ListItemButton
          selected={selectedIndex === 8}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 9}
          onClick={(event) => {
            handleListItemClick(event, 9)
            router.push('/t&c')
          }}
        >
          <ListItemIcon>
            <GavelIcon />
          </ListItemIcon>
          <ListItemText primary="Terms & Conditions" />
        </ListItemButton>
      </List>
    </Box>
  );
}
