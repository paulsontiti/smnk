import * as React from "react";
import { Divider, Typography } from "@mui/material";
import { fetchProfessionalsDetails, getWallet } from "@/lib/search";
import { getClientJobHistory, getUserProfile } from "@/lib/utils/user";
import { Box } from "@mui/material";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import { UserProfileDetails } from "./SWDetailsNoCollapse";
import Comments from "../job/Comments";
import WalletIcon from "@mui/icons-material/Wallet";

export default function ClientDetailsDashboard({
  userId,
  forSw,
}: {
  forSw: boolean;
  userId: string;
}) {
  return (
    <SmnkErrorBoundary>
      <Box sx={{ mt: 1, width: "100%" }} p={1}>
        <ClientProfile clientId={userId} forSw={forSw} />

        <Divider />
      </Box>
    </SmnkErrorBoundary>
  );
}

export function Wallet({ userId }: { userId: string }) {
  const [wallet, setWallet] = React.useState<any>(null);
  React.useEffect(() => {
    (async () => {
      if (userId) {
        const data = await getWallet(userId);

        setWallet(data);
      }
    })();
  }, [userId]);
  if (!wallet)
    return (
      <Box display={"flex"} alignItems={"flex-start"}>
        <WalletIcon />
        <Typography variant="caption">{0}</Typography>
      </Box>
    );
  return (
    <Box display={"flex"} alignItems={"flex-start"}>
      <WalletIcon />
      <Typography variant="caption">{wallet.balance}</Typography>
    </Box>
  );
}
export function ClientProfile({
  clientId,
  forSw,
}: {
  forSw: boolean;
  clientId: string;
}) {
  const [userDetails, setUserDetails] = React.useState<any | null>(undefined);
  const [userProfile, setUserProfile] = React.useState<any | null>(undefined);
  const [completedJobs, setCompletedJobs] = React.useState<number>(0);
  const [pendingJobs, setPendingJobs] = React.useState<number>(0);
  React.useEffect(() => {
    (async () => {
      if (clientId) {
        const data = await fetchProfessionalsDetails(clientId);
        //data comes with {swExtras,user,userExtra}
        setUserDetails(data);
        const profile = await getUserProfile(clientId);
        setUserProfile(profile.data);
        const {
          data: { completedJobs, pendingJobs },
        } = await getClientJobHistory(clientId);

        setCompletedJobs(completedJobs && completedJobs.length);
        setPendingJobs(pendingJobs && pendingJobs.length);
      }
    })();
  }, [clientId]);

  if (userDetails === undefined || userProfile === undefined) return <p></p>;
  return (
    <>
      <UserProfileDetails
        userInfo={userDetails.user}
        forClient={forSw}
        profile={userProfile}
        clientExtraDetails={{
          completedJobs,
          pendingJobs,
        }}
      />{" "}
      {!forSw && <Comments userId={clientId} />}
    </>
  );
}
