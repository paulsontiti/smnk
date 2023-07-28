import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchProfessionalsDetails } from "@/lib/search";
import { getJobsDoneByUser, getUserProfile } from "@/lib/utils/user";
import { Box, Divider } from "@mui/material";
import UserDetailsBottomNavigation from "../bottomNavigation/UserDetailsBottomNavigation";
import { Experience } from "@/lib/experience";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import { Service } from "@/lib/types/service";
import CatalogDisplayStepper from "../stepper/CatalogDisplayStepper";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppBadIcon from "@mui/icons-material/GppBad";

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

export default function SWDetailsCard({ userId }: { userId: string }) {
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
    <Card
      sx={{
        maxWidth: "100%",
        minWidth: "100%",
        minHeight: { xs: 300, md: 300 },
        maxHeight: { xs: 300, md: 300 },
        overflow: "scroll",
        mt: "1rem",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
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
        }
        subheader={
          <SubHeader userProfile={userProfile} userDetails={userDetails} />
        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary" maxWidth={"100%"}>
          {userProfile.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <UserDetailsBottomNavigation
          rating={
            userDetails.userExtra && userDetails.userExtra.rating
              ? userDetails.userExtra.rating
              : 0
          }
          jobsDone={jobsDone}
          level={userDetails.swExtras.level}
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ bgcolor: theme.smnk[100] }}>
          {userDetails.swExtras.experience.length > 0 && (
            <Box bgcolor={theme.smnk[200]} p={2}>
              {userDetails.swExtras.experience.length > 0 && (
                <Typography variant="subtitle2">Experiences:</Typography>
              )}
              {userDetails.swExtras.experience.map((exp: Experience) => (
                <Experience exp={exp} key={exp._id} />
              ))}
            </Box>
          )}
          {userDetails.swExtras.services.length > 0 && (
            <Box bgcolor={theme.smnk[300]} p={2}>
              {userDetails.swExtras.services.length > 0 && (
                <Typography variant="subtitle2">Servives:</Typography>
              )}
              {userDetails.swExtras.services.map((serv: Service) => (
                <Service serv={serv} key={serv._id} />
              ))}
            </Box>
          )}

          {userDetails.swExtras.catalog.length > 1 && (
            <Box p={2} bgcolor={"white"}>
              {userDetails.swExtras.catalog && (
                <Typography variant="subtitle2">Catalog:</Typography>
              )}
              <CatalogDisplayStepper catalog={userDetails.swExtras.catalog} />
            </Box>
          )}
        </CardContent>
      </Collapse>
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
function Experience({ exp }: { exp: Experience }) {
  return (
    <Box
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
      mt={2}
    >
      <Box>
        <Typography variant="caption">Role Title:</Typography>
        <Typography variant="caption" sx={{ ml: "1rem" }}>
          {exp.title}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Company:</Typography>
        <Typography variant="caption" sx={{ ml: "1rem" }}>
          {exp.company}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Description:</Typography>
        <Typography variant="caption" sx={{ ml: "1rem" }}>
          {exp.description}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Start Date:</Typography>
        <Typography variant="caption" sx={{ ml: "1rem" }}>
          {moment(exp.startDate).format("DD/MM/YYYY")}
        </Typography>
      </Box>
      {exp.endDate ? (
        <Box>
          <Typography variant="caption">End Date:</Typography>
          <Typography variant="caption" sx={{ ml: "1rem" }}>
            {moment(exp.endDate).format("DD/MM/YYYY")}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="caption">On Role</Typography>
        </Box>
      )}
      <Divider />
    </Box>
  );
}
function Service({ serv }: { serv: Service }) {
  return (
    <Box
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
      mt={2}
    >
      <Box>
        <Typography variant="caption">Title:</Typography>
        <Typography variant="caption" sx={{ ml: "1rem" }}>
          {serv.title}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Skills:</Typography>
        <Typography variant="caption" sx={{ ml: "1rem" }}>
          {`${serv.skills[0]}${serv.skills[1] ? "," + serv.skills[1] : ""}`}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Description:</Typography>
        <Typography variant="caption" sx={{ ml: "1rem" }}>
          {serv.description}
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
}
