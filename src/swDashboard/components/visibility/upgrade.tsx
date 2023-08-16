import InfoAlert from "@/components/alerts/Info";
import SuccessAlert from "@/components/alerts/Success";
import { RootState } from "@/store";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Upgrade = ({ visibility }: { visibility: string }) => {
  const theme = useTheme();
  const router = useRouter();
  const {
    users: {
      user: { _id },
    },
    swExtra: {
      swExtra: { subscription },
    },
  } = useSelector((state: RootState) => state);

  const [subscribed, setSubscribed] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
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
    return <InfoAlert message="Subscription pending,Admin will soon approve" />;
  if (subscribed)
    return (
      <SuccessAlert
        message={`Subscribed till ${moment(subscription.expiringDate).format(
          "DD/MM/YYYY"
        )}`}
      />
    );
  return (
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
  );
};
