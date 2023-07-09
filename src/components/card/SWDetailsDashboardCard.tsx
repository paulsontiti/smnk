import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { fetchProfessionalsDetails } from "@/lib/search";
import { getJobsDoneByUser, getUserProfile } from "@/lib/utils/user";
import { Box } from "@mui/material";
import UserDetailsBottomNavigation from "../bottomNavigation/UserDetailsBottomNavigation";
import { useTheme } from "@mui/material/styles";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppBadIcon from "@mui/icons-material/GppBad";
import InfoAlert from "../alerts/Info";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SWDetailsDashboardCard({ userId }: { userId: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<any | null>(null);
  const [userProfile, setUserProfile] = React.useState<any | null>(null);
  const [jobsDone, setJobsDone] = React.useState<number>(0);
  const theme = useTheme();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    (async () => {
      const data = await fetchProfessionalsDetails(userId);
      //data comes with {swExtras,user,userExtra}
      setUserDetails(data);
      const profile = await getUserProfile(userId);
      setUserProfile(profile.data);
      const doneJobs = await getJobsDoneByUser(userId);
      setJobsDone(doneJobs.data && doneJobs.data.length);
    })();
  }, [userId]);
  if (!userDetails || !userProfile)
    return (
      <InfoAlert message="Please complete your account creation by adding Info,services,experience" />
    );
  return (
    <Card
      sx={{
        mt: 1,
        minWidth: "100%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 70, height: 70 }}
            aria-label="recipe"
            src={`/api/multer/profile-pic/${userDetails.user.dpFileName}`}
          ></Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Typography textTransform={"capitalize"}>
                {userProfile.name
                  ? userProfile.name
                  : userProfile.firstName + " " + userProfile.lastName}
              </Typography>
              {userDetails.user.verification.kycVeried ? (
                <VerifiedIcon
                  color="success"
                  sx={{ display: "flex", alignItems: "flex-start", width: 15 }}
                />
              ) : (
                <GppBadIcon
                  color="error"
                  sx={{ display: "flex", alignItems: "flex-start", width: 15 }}
                />
              )}
            </Box>
          </>
        }
        subheader={
          <SubHeader userProfile={userProfile} userDetails={userDetails} />
        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary" mb={5}>
          {userProfile.description}
        </Typography>
        <UserDetailsBottomNavigation
          rating={
            userDetails.userExtra && userDetails.userExtra.rating
              ? userDetails.userExtra.rating
              : 0
          }
          jobsDone={jobsDone}
          level={userDetails.swExtras.level}
        />
      </CardContent>
    </Card>
  );
}

function SubHeader({
  userProfile,
  userDetails,
}: {
  userProfile: any;
  userDetails: any;
}) {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
    >
      <Typography variant="caption">{`${
        userDetails.swExtras.services[0].title
      }${
        userDetails.swExtras.services[1]
          ? "," + userDetails.swExtras.services[1].title
          : ""
      }`}</Typography>
      <Typography variant="caption">
        {userProfile.lga + "," + userProfile.state}
      </Typography>
    </Box>
  );
}
