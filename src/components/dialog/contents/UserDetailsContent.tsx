import ClientDetailsTable from "@/components/tables/ClientDetailsTable";
import { getUserInfo } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";

function UserDetailsContent({ userId }: { userId: string }) {
  const [client, setClient] = useState<any>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    
      (async ()=>{
        const {data,error} =await getUserInfo(userId);
        setClient(data)
        setError(error)
      })()
  }, [userId]);
  if (error) return <p>An Error Occurred</p>;
  if (!client) return <p>loading....</p>;

  return <ClientDetailsTable client={client} />;
}

export default UserDetailsContent;
