import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { fetchProfessionalsDetails } from "@/lib/search";
import { getClientJobHistory, getUserProfile } from "@/lib/utils/user";
import { Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppBadIcon from "@mui/icons-material/GppBad";
import ClientDetailsBottomNavigation from "../bottomNavigation/ClientDetailsBottomNavigation";
import ClientJobHistory from "../job/ClientJobHistory";
import Comments from "../job/Comments";
import LoadingAlert from "../alerts/Loading";

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
  const [userDetails, setUserDetails] = React.useState<any | null>(null);
  const [userProfile, setUserProfile] = React.useState<any | null>(null);
  const [completedJobs, setCompletedJobs] = React.useState<number>(0);
  const [pendingJobs, setPendingJobs] = React.useState<number>(0);
  React.useEffect(() => {
    (async () => {
      if (userId) {
        const data = await fetchProfessionalsDetails(userId);
        //data comes with {swExtras,user,userExtra}
        setUserDetails(data);
        const profile = await getUserProfile(userId);
        setUserProfile(profile.data);
        const {
          data: { completedJobs, pendingJobs },
        } = await getClientJobHistory(userId);

        setCompletedJobs(completedJobs && completedJobs.length);
        setPendingJobs(pendingJobs && pendingJobs.length);
      }
    })();
  }, [userId]);
  //check for data before using them
  const dp =
    userDetails && userDetails.user && userDetails.user.dpFileName
      ? userDetails.user.dpFileName
      : "";
  const fullName = () => {
    if (userProfile) {
      if (userProfile.name) return userProfile.name;
      return userProfile.firstName + " " + userProfile.lastName;
    }
    return "";
  };
  const verified =
    userDetails &&
    userDetails.user &&
    userDetails.user.verification &&
    userDetails.user.verification.kycVeried;
  if (!userDetails || !userProfile) return <LoadingAlert />;
  return (
    <Card sx={{ mt: 1, width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 70, height: 70 }}
            aria-label="recipe"
            src={`/api/multer/profile-pic/${dp}`}
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
              <Typography textTransform={"capitalize"}>{fullName()}</Typography>
              {fullName() && (
                <>
                  {verified ? (
                    <VerifiedIcon
                      color="success"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: 15,
                      }}
                    />
                  ) : (
                    <GppBadIcon
                      color="error"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: 15,
                      }}
                    />
                  )}
                </>
              )}
            </Box>
          </>
        }
        subheader={<SubHeader userProfile={userProfile} />}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary" mb={5}>
          {userProfile && userProfile.description}
        </Typography>
        <ClientDetailsBottomNavigation
          rating={
            userDetails && userDetails.userExtra && userDetails.userExtra.rating
              ? userDetails.userExtra.rating
              : 0
          }
          completedJobs={completedJobs}
          pendingJobs={pendingJobs}
        />
        <ClientJobHistory />

        <Comments />
      </CardContent>
    </Card>
  );
}

function SubHeader({ userProfile }: { userProfile: any }) {
  if (!userProfile) return <p></p>;
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
    >
      <Typography variant="caption">
        {userProfile && userProfile.lga + "," + userProfile.state}
      </Typography>
    </Box>
  );
}
