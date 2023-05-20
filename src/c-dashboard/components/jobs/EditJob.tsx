import React from "react";
import JobForm from "./jobForm";
import { editJobSubmitHandler, getJobByJobId } from "@/lib/types/job";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useSWR from "swr";

function EditJob({ jobId }: { jobId: string }) {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const { data, error } = useSWR("getAJob", getJobByJobId(jobId));

  if (error) return <p>Error occurred</p>;
  if (!data) return <p>loading.....</p>;
  
  //convert dates to format yyyy-mm-dd
  data.jobDetails.startDate = data.jobDetails && data.jobDetails.startDate.toString().slice(0,10);
  data.jobDetails.endDate = data.jobDetails && data.jobDetails.endDate.toString().slice(0,10);
  const initialValues = data.jobDetails;
  return (
    <JobForm
      initialValues={initialValues}
      _id={_id}
      jobId={jobId}
      submitHandler={editJobSubmitHandler}
    />
  );
}

export default EditJob;
