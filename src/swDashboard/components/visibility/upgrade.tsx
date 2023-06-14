import InfoAlert from "@/components/alerts/Info";
import SuccessAlert from "@/components/alerts/Success";
import { getUserSub } from "@/lib/user";
import { RootState } from "@/store";
import { Button } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Upgrade = ({ visibility }: { visibility: string }) => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.users);
  const [subscribed, setSubscribed] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user && user.subscription) {
      if (user.subscription && user.subscription.expiringDate) {
        setSubscribed(
          new Date(user.subscription.expiringDate) > new Date() &&
            user.subscription.type === visibility &&
            user.subscription.popConfirmed
        );
      } else {
        (async () => {
          const data = await getUserSub(user._id);
          setSubscribed(data && data.type === visibility && data.popConfirmed);
        })();
      }
      if (user.subscription.pop && !user.subscription.popConfirmed) {
        setPending(true);
      }
    }
  }, [user, visibility]);
  if (pending)
    return <InfoAlert message="Subscription pending,Admin will soon approve" />;
  if (subscribed)
    return (
      <SuccessAlert
        message={`Subscribed till ${moment(
          user.subscription.expiringDate
        ).format("DD/MM/YYYY")}`}
      />
    );
  return (
    <Button
      onClick={() => {
        router.push(`/dashboard/payment/${visibility}`);
      }}
      size="small"
      fullWidth
      color="success"
      variant="contained"
    >
      Upgrade
    </Button>
  );
};
