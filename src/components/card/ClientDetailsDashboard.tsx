import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Badge, Typography } from "@mui/material";
import { fetchProfessionalsDetails } from "@/lib/search";
import { getJobsDoneByUser, getUserProfile } from "@/lib/utils/user";
import { Box, Divider } from "@mui/material";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppBadIcon from "@mui/icons-material/GppBad";
import ClientDetailsBottomNavigation from "../bottomNavigation/ClientDetailsBottomNavigation";

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

export default function ClientDetailsDashboard({ userId }: { userId: string }) {
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
      setJobsDone(doneJobs.data.length);
    })();
  }, [userId]);
  if (!userDetails || !userProfile) return <p></p>;
  return (
    <Card sx={{ mt: 5 }}>
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
            <Badge
              badgeContent={
                userDetails.user.verification.kycVeried ? (
                  <VerifiedIcon color="success" />
                ) : (
                  <GppBadIcon color="error" />
                )
              }
            >
              <Typography textTransform={"capitalize"}>
                {userProfile.name
                  ? userProfile.name
                  : userProfile.firstName + " " + userProfile.lastName}
              </Typography>
            </Badge>
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
        <ClientDetailsBottomNavigation
          rating={
            userDetails.userExtra && userDetails.userExtra.rating
              ? userDetails.userExtra.rating
              : 0
          }
          jobsDone={jobsDone}
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
      <Typography variant="caption">
        {userProfile.lga + "," + userProfile.state}
      </Typography>
    </Box>
  );
}
