import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useSWR from "swr";
import { getPendingJobsByClientId } from "@/lib/types/job";
import JobDetailsAccordion from "@/components/accordion/ClientJobDetailsAccordion";
import { useRouter } from "next/router";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import InfoAlert from "@/components/alerts/Info";
import AddBottomNavigation from "@/components/bottomNavigation/AddBottomNavigation";
import ClientSearchBox from "@/components/autoComplete/ClientSearchBox";

export default function ClientJobsComponent() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const { data, error } = useSWR(
    "getpendingJobs",
    getPendingJobsByClientId(_id)
  );
  const router = useRouter();

  const getDate = (date: Date | null) => {
    return date && date.toString().slice(0, 10);
  };
  if (error) return <ErrorAlert />;
  if (!data) return <LoadingAlert />;
  if (!Array.isArray(data) || data.length < 1)
    return (
      <>
        <InfoAlert message="No Pending Job Available. Please Create A Job" />
        <AddBottomNavigation
          label="Create Job"
          handleClick={() => {
            router.push("/c-dashboard/job/create-job");
          }}
        />
      </>
    );

  return (
    <>
      <ClientSearchBox />
      <Box maxWidth={{ xs: "100%", md: "80%" }}>
        <Typography sx={{ margin: "1rem 1rem", fontWeight: "bold" }}>
          All Jobs
        </Typography>
        {data.map((job: any) => {
          return <JobDetailsAccordion key={job._id} job={job} />;
        })}
        <AddBottomNavigation
          label="Create A Job"
          handleClick={() => {
            router.push("/c-dashboard/job/create-job");
          }}
        />
      </Box>
    </>
  );
}
