import SWExpsAccordion from "@/components/accordion/SWExpsAccordion";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import { getUserExp } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";

function UserExpContent({ userId }: { userId: string }) {
  const [exps, setExps] = useState<any[] | null>(null);
  const [error, setError] = useState<any>();
  useEffect(() => {
    (async () => {
      const { data, error } = await getUserExp(userId);
      setExps(data);
      setError(error);
    })();
  }, [userId]);
  if (error) return <ErrorAlert />;
  if (!exps) return <LoadingAlert />;

  return <>{<SWExpsAccordion exps={exps} />}</>;
}

export default UserExpContent;
