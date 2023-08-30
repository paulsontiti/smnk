import SWReportsAccordion from "@/components/accordion/SWReportsAccordion";
import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";
import ClientJobDetailsCard from "@/components/card/ClientJobDetailsCard";
import Layout from "@/components/dashboard/layout";
import ApplyForJobButton from "@/components/job/ApplyForJobButton";
import { Job } from "@/lib/types/job";
import { RootState } from "@/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CurrentJobPage() {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [job, setJob] = useState<Job | undefined>(undefined);
  const [error, setError] = useState<Job>();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/job/current-job/${_id}`,
        });
        const data = await res.data;
        setJob(data);
      } catch (err: any) {
        console.log(err);
        setError(err);
        return err;
      }
    })();
  }, [_id]);
  if (error) return <ErrorAlert />;
  if (job === undefined) return <LoadingAlert />;
  if (job === null)
    return (
      <Layout>
        <InfoAlert message="No Current Job" />
      </Layout>
    );

  return (
    <Layout>
      <ClientJobDetailsCard job={job as Job} />
      <ApplyForJobButton job={job} />
      <SWReportsAccordion jobId={job._id} />
    </Layout>
  );
}

export default CurrentJobPage;
