import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useSWR from "swr";
import { getJobsByClientId } from "@/lib/types/job";
import { useRouter } from "next/router";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import InfoAlert from "@/components/alerts/Info";
import AddBottomNavigation from "@/components/bottomNavigation/AddBottomNavigation";
import ClientDashboardJobDetailsAccordion from "../accordion/ClientDashboardJobDetailsAccordion";

export default function ClientJobHistory() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const { data, error } = useSWR("getjobs", getJobsByClientId(_id));
  const router = useRouter();

  const getDate = (date: Date | null) => {
    return date && date.toString().slice(0, 10);
  };
  if (error) return <ErrorAlert />;
  if (!data) return <LoadingAlert />;
  if (!Array.isArray(data) || data.length < 1)
    return (
      <>
        <InfoAlert message="No Job Available. Please Create A Job" />
        <AddBottomNavigation
          label="Create Job"
          handleClick={() => {
            router.push("/c-dashboard/job/create-job");
          }}
        />
      </>
    );

  return (
    <Box maxWidth={"100%"} mt={5}>
      <Typography sx={{ margin: "1rem 1rem", fontWeight: "bold" }}>
        Job History - All Jobs
      </Typography>
      {data.map((job: any) => {
        return <ClientDashboardJobDetailsAccordion key={job._id} job={job} />;
      })}
    </Box>
  );
}
