import React from "react";
import JobForm from "./jobForm";
import { getJobByJobId } from "@/lib/types/job";
import useSWR from "swr";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";

function EditJob({ jobId }: { jobId: string }) {
  const { data, error } = useSWR("getAJob", getJobByJobId(jobId));

  if (error) return <ErrorAlert/>
  if (!data) return <LoadingAlert/>
  //convert dates to format yyyy-mm-dd
  data.jobDetails.startDate = data.jobDetails && data.jobDetails.startDate.toString().slice(0,10);
  data.jobDetails.endDate = data.jobDetails && data.jobDetails.endDate.toString().slice(0,10);
  const initialValues = {details:data.jobDetails,jobId:data._id};
  return (
    <JobForm
      initialValues={initialValues}
    />
  );
}

export default EditJob;
