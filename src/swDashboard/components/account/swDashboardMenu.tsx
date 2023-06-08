import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CustomerService } from "@/components/dashboard/customerService";
import UserInfoLink from "../individual/info";
import CompanyProfileLink from "../company/profileLink";
import ExpLink from "./experience/expLink";
import ServiceLink from "./service/serviceLink";
import BankDetailsLink from "./bank-details/bankDetailsLink";
import { useRouter } from "next/router";
import RecommendedJobsLink from "@/components/dashboard/RecommendedJobsLink";
import VisibilityLink from "../visibility/VisibilityLink";
import ThemeContainer from "@/components/theme/ThemeContainer";
import { ListItemIcon } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import GavelIcon from '@mui/icons-material/Gavel';

export default function SWDashboardMenu() {
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter();

  const [openAccount, setOpenAccount] = React.useState(true);
  const [openProfile, setOpenProfile] = React.useState(true);
  const [openJob, setOpenJob] = React.useState(true);
  const [openCustomer, setOpenCustomer] = React.useState(true);

  const accountHandleClick = () => {
    setOpenAccount(!openAccount);
  };

  const profileHandleClick = () => {
    setOpenProfile(!openProfile);
  };

  const jobHandleClick = () => {
    setOpenJob(!openJob);
  };

  const customerHandleClick = () => {
    setOpenCustomer(!openCustomer);
  };

  return (
   <ThemeContainer>
     <List
      sx={{ width: "100%", maxWidth: 360, pl: 0, overflowY: "auto" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton sx={{ ml: 0 }} onClick={accountHandleClick}>
            <ListItemIcon><AccountCircleIcon sx={{color:"yellow"}}/></ListItemIcon>
        <ListItemText primary="Account" />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAccount} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={profileHandleClick} sx={{ ml: 4 }}>
          <ListItemIcon><PersonIcon sx={{color:"yellow"}}/></ListItemIcon>
          
            <ListItemText sx={{fontSize:'2px'}} primary="Profile" />
            {openProfile ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openProfile} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {user && user.typeClass === "individual" ? (
                <UserInfoLink />
              ) : (
                <CompanyProfileLink />
              )}
              <ExpLink />
              <ServiceLink />
              <BankDetailsLink />
            </List>
          </Collapse>
          <VisibilityLink />
          <ListItemButton
            sx={{ ml: 4 }}
            onClick={() => {
              router.push("/dashboard/change-password");
            }}
          > <ListItemIcon><SettingsIcon sx={{color:"yellow"}}/></ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
          <ListItemButton
            sx={{ ml: 4 }}
            onClick={() => {
              router.push("/t&c");
            }}
          > <ListItemIcon><GavelIcon sx={{color:"yellow"}}/></ListItemIcon>
            <ListItemText primary="Terms & Conditions" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton sx={{ ml: 1 }} onClick={jobHandleClick}>
        <ListItemText primary="Job" />
        {openJob ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openJob} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RecommendedJobsLink />

          <ListItemButton
            sx={{ ml: 4 }}
            onClick={() => {
              router.push("/dashboard/job/current");
            }}
          >
            <ListItemText primary="Current Job" />
          </ListItemButton>
          <ListItemButton
            sx={{ ml: 4 }}
            onClick={() => {
              router.push("/dashboard/job/done");
            }}
          >
            <ListItemText primary="Done Jobs" />
          </ListItemButton>
        </List>
      </Collapse>
      <CustomerService
        openCustomer={openCustomer}
        customerHandleClick={customerHandleClick}
      />
    </List>
    </ThemeContainer>
  );
}
