import { useState, useEffect } from "react";
import CardHeader from "@mui/material/CardHeader";
import { Divider, Typography, Badge } from "@mui/material";
import { fetchProfessionalsDetails } from "@/lib/search";
import {
  getJobsDoneByUser,
  getUserProfile,
  isUserVerified,
} from "@/lib/utils/user";
import { Box, Avatar } from "@mui/material";
import UserDetailsBottomNavigation from "../bottomNavigation/UserDetailsBottomNavigation";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppBadIcon from "@mui/icons-material/GppBad";
import LoadingAlert from "../alerts/Loading";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import { BlackAvatar } from "../avatar/DashboardDp";
import ErrorAlert from "../alerts/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UserDetailsTab, { BlackListDisplay } from "../tabs/UserDetailsTab";
import { User } from "@/lib/types/userInfo";
import ClientDetailsBottomNavigation from "../bottomNavigation/ClientDetailsBottomNavigation";
import { BlackTypography } from "./ClientJobDetailsCard";

export default function SWDetailsNoCollapse({
  userId,
  forClient,
}: {
  forClient: boolean;
  userId: string;
}) {
  const [userDetails, setUserDetails] = useState<any | null>(undefined);
  const [userProfile, setUserProfile] = useState<any | null>(undefined);
  const [jobsDone, setJobsDone] = useState<number>(0);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (userId) {
        const data = await fetchProfessionalsDetails(userId);
        //data comes with {swExtras,user,userExtra}
        setUserDetails(data);
        const profile = await getUserProfile(userId);
        setUserProfile(profile.data);
        setError(profile.error);
        const doneJobs = await getJobsDoneByUser(userId);
        setJobsDone(doneJobs.data && doneJobs.data.length);
        setError(doneJobs.error);
      }
    })();
  }, [userId]);
  //check for data before using them
  const userSub =
    userDetails && userDetails.swExtras && userDetails.swExtras.subscription;
  const catalogue: any[] =
    userDetails && userDetails.swExtras && userDetails.swExtras.catalog;
  const level =
    userDetails && userDetails.swExtras && userDetails.swExtras.level;
  const serviceTitle = () => {
    if (
      userDetails &&
      userDetails.swExtras &&
      userDetails.swExtras.services &&
      userDetails.swExtras.services[0]
    ) {
      if (userDetails.swExtras.services[1]) {
        return (
          userDetails.swExtras.services[0].title +
          "," +
          userDetails.swExtras.services[1].title
        );
      } else {
        return userDetails.swExtras.services[0].title;
      }
    }
    return "";
  };
  const services =
    userDetails && userDetails.swExtras && userDetails.swExtras.services
      ? userDetails.swExtras.services
      : [];
  const skills = () => {
    const skillsArray: string[] = [];
    if (services && services.length > 0) {
      services.map((service: any) => {
        Array.isArray(service.skills) &&
          service.skills.map((skill: string) => {
            skillsArray.push(skill);
          });
      });
    }
    return skillsArray;
  };
  const experiences: any[] =
    userDetails && userDetails.swExtras && userDetails.swExtras.experience
      ? userDetails.swExtras.experience
      : [];
  if (userDetails === undefined || userProfile === undefined)
    return <LoadingAlert />;
  if (error) return <ErrorAlert message={error.toString()} />;
  return (
    <SmnkErrorBoundary>
      <Box
        sx={{
          mt: 5,
          minWidth: { xs: "100%", md: "100%" },
          maxWidth: { xs: 350, sm: 500, md: "100%" },
        }}
      >
        <UserProfileDetails
          userInfo={userDetails.user}
          userSub={userSub}
          profile={userProfile}
          forClient={forClient}
          swExtraDetails={{
            serviceTitle: serviceTitle(),
            jobsDone: jobsDone,
            level: level,
          }}
        />
        <UserDetailsTab
          services={services}
          experiences={experiences}
          skills={skills()}
          catalogue={catalogue}
          forClient={forClient}
          userId={userDetails && userDetails.user && userDetails.user._id}
        />
      </Box>
    </SmnkErrorBoundary>
  );
}

export function UserProfileDetails({
  userInfo,
  profile,
  swExtraDetails,
  clientExtraDetails,
  forClient,
  userSub,
}: {
  swExtraDetails?: { serviceTitle: string; jobsDone: number; level: string };
  clientExtraDetails?: { completedJobs: number; pendingJobs: number };
  userInfo: User;
  userSub?: any;
  profile: any;
  forClient: boolean;
}) {
  const fullName = () => {
    if (profile) {
      if (profile.name) return profile.name;
      return profile.firstName + " " + profile.lastName;
    }
    return "";
  };
  if (!profile) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Box>
        <CardHeader
          sx={{ minWidth: "100%" }}
          avatar={
            <Badge
              color={userInfo && userInfo.active ? "success" : "error"}
              overlap="circular"
              badgeContent=""
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {userInfo.dpFileName ? (
                <BlackAvatar
                  src={`/api/multer/profile-pic/${userInfo.dpFileName}`}
                  alt="Dp"
                  width={100}
                  height={100}
                />
              ) : (
                <Avatar sx={{ width: 100, height: 100 }} />
              )}
            </Badge>
          }
          title={<VerifiedUserName name={fullName()} userId={userInfo._id} />}
          subheader={
            <SubHeader
              userProfile={profile}
              serviceTitle={
                clientExtraDetails
                  ? ""
                  : (swExtraDetails?.serviceTitle as string)
              }
            />
          }
        />
        <Typography
          p={2}
          mt={0}
          component={"span"}
        >{`${userInfo.type}/${userInfo.typeClass}`}</Typography>
        {swExtraDetails && (
          <>
            <UserDetailsBottomNavigation
              forClient={forClient}
              userId={userInfo._id}
              jobsDone={swExtraDetails?.jobsDone as number}
            />
          </>
        )}
        {!forClient && (
          <Box>
            <Typography variant="caption" fontWeight={"bold"}>
              Subscription Details
            </Typography>
            <BlackTypography label="Type" value={userSub && userSub.type} />
            <Typography variant="caption" fontWeight={"bold"}>
              Extra locations
            </Typography>
            {userSub &&
              Array.isArray(userSub.locations) &&
              userSub &&
              userSub.locations.map((loc: string) => (
                <BlackListDisplay key={loc} label={loc} />
              ))}
          </Box>
        )}
        {clientExtraDetails && (
          <ClientDetailsBottomNavigation
            forClient={forClient}
            userId={userInfo._id}
            completedJobs={clientExtraDetails.completedJobs}
            pendingJobs={clientExtraDetails.pendingJobs}
          />
        )}
        <Divider />

        {profile && profile.description && (
          <Box
            p={2}
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            {" "}
            <Typography color="primary" fontWeight={"bold"}>
              Bio:
            </Typography>
            <Typography variant="body2" color="text.secondary" ml={3}>
              {profile.description}
            </Typography>
          </Box>
        )}
        <Divider />
      </Box>
    </SmnkErrorBoundary>
  );
}

function SubHeader({
  userProfile,
  serviceTitle,
}: {
  userProfile: any;
  serviceTitle: string;
}) {
  if (!userProfile) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        flexDirection={"column"}
      >
        <Box display={"flex"} alignItems={"flex-end"}>
          <LocationOnIcon sx={{ color: "red" }} />
          <Typography variant="caption">
            {userProfile && userProfile.lga + "," + userProfile.state}
          </Typography>
        </Box>
        <Typography ml={3} variant="caption" textTransform={"capitalize"}>
          {serviceTitle}
        </Typography>
      </Box>
    </SmnkErrorBoundary>
  );
}
export function VerifiedUserName({
  name,
  userId,
}: {
  userId: string;
  name: string;
}) {
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await isUserVerified(userId);
      setVerified(res.data);
    })();
  }, [userId]);
  if (!name) return <p></p>;
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"}>
      <Typography
        sx={{
          textTransform: "capitalize",
          color: theme.smnk[1000],
          fontWeight: "bold",
        }}
        variant="subtitle1"
      >
        {name}
      </Typography>

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
    </Box>
  );
}
