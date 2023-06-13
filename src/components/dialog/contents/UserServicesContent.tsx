import SWExpsAccordion from "@/components/accordion/SWExpsAccordion";
import SWServicesAccordion from "@/components/accordion/SWServicesAccordion";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import { getUserServices } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";

function UserServicesContent({ userId }: { userId: string }) {
  const [services, setServices] = useState<any[] | null>(null);
  const [error, setError] = useState<any>();
  useEffect(() => {
    (async () => {
      const { data, error } = await getUserServices(userId);
      setServices(data);
      setError(error);
    })();
  }, [userId]);
  if (error) return <ErrorAlert />;
  if (!services) return <LoadingAlert />;

  return <>{<SWServicesAccordion services={services} />}</>;
}

export default UserServicesContent;
