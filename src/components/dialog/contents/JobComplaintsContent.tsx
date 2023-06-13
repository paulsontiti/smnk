import AdminCompliantsAccordion from "@/components/accordion/AdminCompliantsAccordion";
import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";
import { getAllComplaints } from "@/lib/complaint";
import React, { useEffect, useState } from "react";

function JobComplaintsContent({ jobId }: { jobId: string }) {
  const [complaints, setComplaints] = useState<any[] | null>(null);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllComplaints(jobId);
      setComplaints(data);
      setError(error);
    })();
  }, [jobId]);

  if (error) return <ErrorAlert/>
  if (!complaints) return <LoadingAlert/>

  return (
    <>
      {complaints.length > 0 ? (
        <AdminCompliantsAccordion complaints={complaints} />
      ):<InfoAlert message="No Complaints"/>}
    </>
  );
}

export default JobComplaintsContent;
