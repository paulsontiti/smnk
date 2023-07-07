import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserInfoLink from "@/swDashboard/components/individual/info";
import CompanyProfileLink from "@/swDashboard/components/company/profileLink";
import { useRouter } from "next/router";
import {
  ChangePassword,
  LiveChat,
  Verification,
} from "@/swDashboard/components/account/swDashboardMenu";
import { ListItemIcon, Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PendingIcon from "@mui/icons-material/Pending";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HomeIcon from "@mui/icons-material/Home";
import LogoutSwitch from "@/components/switch/LogoutSwitch";

export default function CDashboardMenu() {
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter();

  const [openAccount, setOpenAccount] = React.useState(true);
  const [openJob, setOpenJob] = React.useState(true);
  const [openCustomer, setOpenCustomer] = React.useState(true);

  const accountHandleClick = () => {
    setOpenAccount(!openAccount);
  };

  const jobHandleClick = () => {
    setOpenJob(!openJob);
  };

  const customerHandleClick = () => {
    setOpenCustomer(!openCustomer);
  };

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, pl: 0, overflowY: "auto" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {" "}
        <ListItemButton
          sx={{ ml: 0 }}
          onClick={() => {
            router.push("/");
          }}
        >
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Home</Typography>}
          />
        </ListItemButton>
        <ListItemButton sx={{ ml: 0 }} onClick={accountHandleClick}>
          <ListItemIcon>
            <AccountCircleIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Account</Typography>}
          />
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {user && user.typeClass === "individual" ? (
              <UserInfoLink />
            ) : (
              <CompanyProfileLink />
            )}
            <Verification
              idUrl="/c-dashboard/verification/id-card"
              captureUrl="/c-dashboard/verification/capture"
            />
            <ChangePassword router={router} />
          </List>
        </Collapse>
        <ListItemButton sx={{ ml: 0 }} onClick={jobHandleClick}>
          <ListItemIcon>
            <WorkHistoryIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Job</Typography>}
          />
          {openJob ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openJob} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ ml: 2 }}
              onClick={() => {
                router.push("/c-dashboard/job");
              }}
            >
              <ListItemIcon>
                <PendingIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="caption">Pending Jobs</Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              sx={{ ml: 2 }}
              onClick={() => {
                router.push("/c-dashboard/job/create-job");
              }}
            >
              <ListItemIcon>
                <CreateIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="caption">Create New Job</Typography>
                }
              />
            </ListItemButton>

            <ListItemButton
              sx={{ ml: 2 }}
              onClick={() => {
                router.push("/c-dashboard/job/completed-jobs");
              }}
            >
              <ListItemIcon>
                <AssignmentTurnedInIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="caption">Completed Jobs</Typography>
                }
              />
            </ListItemButton>
          </List>
        </Collapse>
        {/* <LiveChat router={router} /> */}
        <Box ml={2}> {user._id && <LogoutSwitch />}</Box>
      </List>
    </>
  );
}
