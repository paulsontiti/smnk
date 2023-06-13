import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import ClientDetailsTable from "@/components/tables/ClientDetailsTable";
import { getUserInfo } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";

function UserDetailsContent({ userId }: { userId: string }) {
  const [client, setClient] = useState<any>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    (async () => {
      const { data, error } = await getUserInfo(userId);
      setClient(data);
      setError(error);
    })();
  }, [userId]);
  if (error) return <ErrorAlert />;
  if (!client) return <LoadingAlert />;

  return <ClientDetailsTable client={client} />;
}

export default UserDetailsContent;
