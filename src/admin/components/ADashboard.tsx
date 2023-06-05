import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';



   

export default function ADashboardMenu() {
  const router = useRouter();
  const [openJob, setOpenJob] = React.useState(true);

  const jobHandleClick = () => {
    setOpenJob(!openJob);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, pl: 0, overflowY: "auto" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton sx={{ ml: 1 }} onClick={jobHandleClick}>
        <ListItemText primary="Job" />
        {openJob ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openJob} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ ml: 4 }}
            onClick={() => {
              router.push("/a-dashboard/job");
            }}
          >
            <ListItemText primary="All Jobs" />
          </ListItemButton>
          
        </List>
      </Collapse>
      <ListItemButton
        sx={{ ml: 1 }}
        onClick={() => {
          router.push(`/a-dashboard/sw`);
        }}
      >
        <ListItemText primary="Skilled Workers" />
      </ListItemButton>
      <ListItemButton
        sx={{ ml: 1 }}
        onClick={() => {
          router.push(`/a-dashboard/clients`);
        }}
      >
        <ListItemText primary="Clients" />
      </ListItemButton>
      <ListItemButton
        sx={{ ml: 1 }}
        onClick={() => {
          router.push(`/a-dashboard/ads`);
        }}
      >
        <ListItemText primary="Ads" />
      </ListItemButton>
    </List>
  );
}