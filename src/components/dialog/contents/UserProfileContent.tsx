
import {getUserProfile } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";
import UserIndividualProfileDetails from "./UserIndividualProfileDetails";
import UserCompanyProfileDetails from "./UserCompanyProfileDetails";

function UserProfileContent({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<any>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    
      (async ()=>{
        const {data,error} =await getUserProfile(userId);
        setProfile(data)
        setError(error)
      })()
  }, [userId]);
  if (error) return <p>An Error Occurred</p>;
  if (!profile) return <p>loading....</p>;

  return <>
  {
    profile.firstName ? <UserIndividualProfileDetails profile={profile} /> : <UserCompanyProfileDetails profile={profile}/>
  }
  </>
}

export default UserProfileContent;
