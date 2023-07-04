import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HomeIcon from "@mui/icons-material/Home";

import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import LogoutSwitch from "@/components/switch/LogoutSwitch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { theme } from "@/pages/_app";
import HomeNotification from "@/components/dashboard/Notification";

export default function NavDrawerLinks() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openAboutSMNK, setOpenAboutSMNK] = React.useState(true);

  const { _id } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();

  //handle aboutsmnk opening

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          sx={{ ml: 0 }}
          onClick={() => {
            router.push("/");
          }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: theme.smnk[1000] }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="primary">
                Home
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => {
            setOpenAboutSMNK(!openAboutSMNK);
            handleListItemClick(event, 1);
          }}
        >
          <ListItemIcon>
            <InfoIcon sx={{ color: theme.smnk[1000] }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                About SMNK
              </Typography>
            }
          />
          {openAboutSMNK ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAboutSMNK} timeout="auto" unmountOnExit>
          <List
            component="nav"
            aria-label="secondary mailbox folder"
            sx={{ ml: 8 }}
          >
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => {
                handleListItemClick(event, 2);
                router.push("/about-us");
              }}
            >
              <ListItemIcon>
                <FeedIcon sx={{ color: theme.smnk[1000] }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="caption" color="primary">
                    About Us
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3);
                router.push("/vision");
              }}
            >
              <ListItemIcon>
                <RemoveRedEyeIcon sx={{ color: theme.smnk[1000] }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="caption" color="primary">
                    Vision
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4);
                router.push("/mission");
              }}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon sx={{ color: theme.smnk[1000] }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="caption" color="primary">
                    Mission
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => {
                handleListItemClick(event, 5);
                router.push("/purpose");
              }}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon sx={{ color: theme.smnk[1000] }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="caption" color="primary">
                    Purpose
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 6}
              onClick={(event) => {
                handleListItemClick(event, 6);
                router.push("/team");
              }}
            >
              <ListItemIcon>
                <Diversity3Icon sx={{ color: theme.smnk[1000] }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="caption" color="primary">
                    Our Team
                  </Typography>
                }
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 7}
          onClick={(event) => {
            handleListItemClick(event, 7);
            router.push("/services");
          }}
        >
          <ListItemIcon>
            <BusinessIcon sx={{ color: theme.smnk[1000] }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                Services
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 8}
          onClick={(event) => {
            handleListItemClick(event, 8);
            router.push("/jobs");
          }}
        >
          <ListItemIcon>
            <WorkIcon sx={{ color: theme.smnk[1000] }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                Jobs
              </Typography>
            }
          />
        </ListItemButton>

        <HomeNotification />
      </List>
      <Box ml={2}> {_id && <LogoutSwitch />}</Box>
    </Box>
  );
}
