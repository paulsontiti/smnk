import React from "react";
import JobForm from "./jobForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { JobDetails } from "@/lib/job";
import { useEffect } from "react";
import { useRouter } from "next/router";

function CreateJob() {
  const router = useRouter();
  const { _id } = useSelector((state: RootState) => state.users.user);
  useEffect(() => {
    if (!_id) {
      router.push("/account/login");
    }
  });

  const initialValues: JobDetails = {
    title: "",
    type: "physical",
    category: "",
    state: "",
    lga: "",
    address: "",
    description: "",
    budget: 0,
    startDate: new Date(),
    endDate: new Date(),
    agreeToTerms: false,
    userId: _id,
  };
  return <JobForm initialValues={{ details: initialValues, jobId: "" }} />;
}

export default CreateJob;
