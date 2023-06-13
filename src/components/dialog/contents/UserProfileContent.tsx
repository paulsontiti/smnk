import { getUserProfile } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";
import UserIndividualProfileDetails from "./UserIndividualProfileDetails";
import UserCompanyProfileDetails from "./UserCompanyProfileDetails";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";

function UserProfileContent({ userId }: { userId: string }) {
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
      {profile.firstName ? (
        <UserIndividualProfileDetails profile={profile} />
      ) : (
        <UserCompanyProfileDetails profile={profile} />
      )}
    </>
  );
}

export default UserProfileContent;
