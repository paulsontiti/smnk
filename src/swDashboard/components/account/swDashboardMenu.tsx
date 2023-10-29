import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserInfoLink from "../individual/info";
import CompanyProfileLink from "../company/profileLink";
import ExpLink, { MenuLink } from "./experience/expLink";
import ServiceLink from "./service/serviceLink";
import BankDetailsLink from "./bank-details/bankDetailsLink";
import { useRouter } from "next/router";
import RecommendedJobsLink from "@/components/dashboard/RecommendedJobsLink";
import VisibilityLink from "../visibility/VisibilityLink";
import { ListItemIcon, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { Typography } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useTheme } from "@mui/material/styles";
import CollectionsIcon from "@mui/icons-material/Collections";
import LogoutSwitch from "@/components/switch/LogoutSwitch";
import { theme } from "@/pages/_app";
import Divider from "@mui/material/Divider";
import { isUserVerified } from "@/lib/utils/user";
import { WalletLink } from "@/c-dashboard/components/account/cDashboardMenu";

export default function SWDashboardMenu() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter();

  const [openAccount, setOpenAccount] = React.useState(true);
  const [openProfile, setOpenProfile] = React.useState(true);
  const [openJob, setOpenJob] = React.useState(true);

  const accountHandleClick = () => {
    setOpenAccount(!openAccount);
  };

  const profileHandleClick = () => {
    setOpenProfile(!openProfile);
  };

  const jobHandleClick = () => {
    setOpenJob(!openJob);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        pl: 0,
        overflowY: "auto",
        color: theme.smnk[700],
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        sx={{ ml: 0 }}
        onClick={() => {
          router.push("/");
        }}
      >
        <ListItemIcon>
          <HomeIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body1">Home</Typography>} />
      </ListItemButton>
      <Divider />
      <ListItemButton sx={{ ml: 0 }} onClick={accountHandleClick}>
        <ListItemIcon>
          <AccountCircleIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant="body1">Account</Typography>}
        />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openAccount} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton onClick={profileHandleClick} sx={{ ml: 0 }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: theme.smnk[1000] }} />
            </ListItemIcon>

            <ListItemText
              primary={<Typography variant="body2">Profile</Typography>}
            />
            {openProfile ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />
          <Collapse in={openProfile} timeout="auto" unmountOnExit>
            <List component="div">
              <Verification
                idUrl="/sw-dashboard/verification/id-card"
                captureUrl="/sw-dashboard/verification/capture"
              />
              {user && user.typeClass === "individual" ? (
                <UserInfoLink />
              ) : (
                <CompanyProfileLink />
              )}
              <Divider />
              <ExpLink />
              <Divider />
              <ServiceLink />
              <Divider />
              <BankDetailsLink />
              <Divider />
              <Catalog router={router} />
              <Divider />
              <ChangePassword router={router} />
            </List>
          </Collapse>
          <Divider />
          <VisibilityLink />
        </List>
      </Collapse>
      <Divider />
      <ListItemButton sx={{ ml: 0 }} onClick={jobHandleClick}>
        <ListItemIcon>
          <WorkHistoryIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body1">Job</Typography>} />
        {openJob ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>{" "}
      <Divider />
      <Collapse in={openJob} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RecommendedJobsLink />
          <Divider />
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push("/dashboard/job/current");
            }}
          >
            {" "}
            <ListItemIcon>
              <StayCurrentPortraitIcon sx={{ color: theme.smnk[1000] }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">Current Job</Typography>}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push("/dashboard/job/done");
            }}
          >
            <ListItemIcon>
              <AssignmentTurnedInIcon sx={{ color: theme.smnk[1000] }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">Jobs Done</Typography>}
            />
          </ListItemButton>
        </List>
        <Divider />
      </Collapse>
      <WalletLink />
      <LiveChat /> <Divider />
      <Box ml={2}> {_id && <LogoutSwitch />}</Box>
    </List>
  );
}
export function ChangePassword({ router }: any) {
  return (
    <ListItemButton
      sx={{ ml: 0 }}
      onClick={() => {
        router.push("/dashboard/change-password");
      }}
    >
      {" "}
      <ListItemIcon>
        <SettingsIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="caption">Change Password</Typography>}
      />
    </ListItemButton>
  );
}

export function LiveChat() {
  const router = useRouter();
  return (
    <ListItemButton
      sx={{ ml: 0 }}
      onClick={() => router.push(`/chat/${process.env.CUSTOMER_SERVICE_ID}`)}
    >
      <ListItemIcon>
        <ContactSupportIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="body1">Live Chat</Typography>}
      />
    </ListItemButton>
  );
}
export function Catalog({ router }: any) {
  return (
    <ListItemButton
      sx={{ ml: 0 }}
      onClick={() => {
        router.push("/dashboard/catalog/");
      }}
    >
      {" "}
      <ListItemIcon>
        <CollectionsIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="caption">Catalog</Typography>}
      />
    </ListItemButton>
  );
}

export function Verification({
  idUrl,
  captureUrl,
}: {
  idUrl: string;
  captureUrl: string;
}) {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [verified, setVerified] = React.useState(false);
  const [openVerification, setOpenVerification] = React.useState(true);
  const openVerificationHandleClick = () => {
    setOpenVerification(!openVerification);
  };
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      const res = await isUserVerified(_id);
      setVerified(res.data);
    })();
  });
  if (verified) return null;
  return (
    <>
      <ListItemButton sx={{ ml: 0 }} onClick={openVerificationHandleClick}>
        {" "}
        <ListItemIcon>
          <WorkspacePremiumIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>{" "}
        <ListItemText
          primary={<Typography variant="caption">Verification</Typography>}
        />
        {openVerification ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openVerification} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push(idUrl);
            }}
          >
            <ListItemIcon>
              <PermIdentityIcon sx={{ color: theme.smnk[1000] }} />
            </ListItemIcon>
            <ListItemText
              primary={<MenuLink label="ID Photo" pending={true} />}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push(captureUrl);
            }}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon sx={{ color: theme.smnk[1000] }} />
            </ListItemIcon>
            <ListItemText
              primary={<MenuLink label="Camera Photo" pending={true} />}
            />
          </ListItemButton>{" "}
          <Divider />
        </List>
      </Collapse>
    </>
  );
}
