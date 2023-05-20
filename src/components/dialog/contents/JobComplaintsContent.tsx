import AdminCompliantsAccordion from "@/components/accordion/AdminCompliantsAccordion";
import { getAllComplaints } from "@/lib/complaint";
import React, { useEffect, useState } from "react";

function JobComplaintsContent({ jobId }: { jobId: string }) {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllComplaints(jobId);
      setComplaints(data);
      setError(error);
    })();
  }, [jobId]);

  if (error) return <p>Error occurred while fetching job status</p>;
  if (!complaints) return <p>loading....</p>;

  return (
    <>
      {complaints.length > 0 ? (
        <AdminCompliantsAccordion complaints={complaints} />
      ):<p>No Complaints</p>}
    </>
  );
}

export default JobComplaintsContent;
