import InfoAlert from "@/components/alerts/Info";
import SuccessAlert from "@/components/alerts/Success";
import { RootState } from "@/store";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserSub } from "@/lib/payment";
import { BlackListDisplay } from "@/components/tabs/UserDetailsTab";

export const Upgrade = ({ visibility }: { visibility: string }) => {
  const theme = useTheme();
  const router = useRouter();
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [subscription, setSubscription] = useState<any>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    (async () => {
      const userSub = await getUserSub(_id);
      setSubscription(userSub);
    })();
    if (subscription) {
      if (subscription.expiringDate) {
        setSubscribed(
          new Date(subscription.expiringDate) > new Date() &&
            subscription.type === visibility &&
            subscription.popConfirmed
        );
      } else {
        if (
          subscription.pop &&
          !subscription.popConfirmed &&
          subscription.type === visibility
        ) {
          setPending(true);
        }
      }
    }
  }, [_id, subscription, visibility]);
  if (pending)
    return (
      <Box position={"absolute"} bottom={2}>
        <InfoAlert message="Subscription pending,Admin will soon approve" />
      </Box>
    );
  if (subscribed)
    return (
      <Box position={"absolute"} bottom={2} left={5}>
        <SuccessAlert
          message={`Subscribed till ${moment(subscription.expiringDate).format(
            "DD/MM/YYYY"
          )}`}
        />
        {subscription.locations.length === 0 ? (
          <Button
            onClick={() => {
              router.push(
                `/sw-dashboard/visibility/add-locations/${subscription.type}`
              );
            }}
            sx={{ bgcolor: "white", mt: 2 }}
          >
            Add Extra Locations
          </Button>
        ) : (
          <>
            <Typography m={2}>Preferred Locations:</Typography>
            {subscription.locations.map((loc: string) => (
              <BlackListDisplay key={loc} label={loc} />
            ))}
          </>
        )}
      </Box>
    );
  return (
    <Box position={"absolute"} bottom={2}>
      <Button
        onClick={() => {
          router.push(`/dashboard/payment/${visibility}`);
        }}
        size="small"
        variant="contained"
        sx={{ bgcolor: theme.smnk[1200] }}
      >
        Upgrade
      </Button>
    </Box>
  );
};
