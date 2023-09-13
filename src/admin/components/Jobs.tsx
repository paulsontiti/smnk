import useSWR from "swr";
import { getAllJobs } from "@/lib/types/job";
import JobsDetailsTable from "./jobs/JobsDetailsTable";
import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";
import { Typography } from "@mui/material";

export default function Jobs() {
  const { data, error } = useSWR("getjobs", getAllJobs());
  if (error)
    return (
      <ErrorAlert message="An Error occurred fetching data. Please ensure you are connected to the internet and try again or refresh te page" />
    );
  if (!data) return <LoadingAlert />;
  if (data.length < 1) return <InfoAlert message="No Jobs available" />;

  return (
    <>
      <Typography m={5} variant="h6">
        Jobs
      </Typography>
      <JobsDetailsTable jobs={data} />
    </>
  );
}
