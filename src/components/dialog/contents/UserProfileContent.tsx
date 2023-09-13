import { getUserProfile } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import SWDetailsNoCollapse from "@/components/card/SWDetailsNoCollapse";
import { ClientProfile } from "@/components/card/ClientDetailsDashboard";

function UserProfileContent({
  userId,
  type,
}: {
  userId: string;
  type: string;
}) {
  const [profile, setProfile] = useState<any | null>(null);
  const [error, setError] = useState<any>();
  useEffect(() => {
    (async () => {
      const { data, error } = await getUserProfile(userId);
      setProfile(data);
      setError(error);
    })();
  }, [userId]);
  if (error) return <ErrorAlert />;
  if (!profile) return <LoadingAlert />;

  return (
    <>
      {type === "skilled worker" ? (
        <SWDetailsNoCollapse forClient={false} userId={userId} />
      ) : (
        <ClientProfile clientId={userId} forSw={false} />
      )}
    </>
  );
}

export default UserProfileContent;
