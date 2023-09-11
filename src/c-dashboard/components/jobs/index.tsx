import { AlertColor, Box, Typography } from "@mui/material";
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
import { isUserVerified } from "@/lib/utils/user";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useRef, useState } from "react";

export default function ClientJobsComponent() {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const { data, error } = useSWR(
    "getpendingJobs",
    getPendingJobsByClientId(_id)
  );
  const router = useRouter();
  //declare refs
  const snackBarRef = useRef();
  if (error) return <ErrorAlert />;
  if (!data) return <LoadingAlert />;

  return (
    <>
      <ClientSearchBox />
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <Box minWidth={"100%"}>
        {Array.isArray(data) && data.length === 0 ? (
          <>
            <InfoAlert message="No Pending Job Available. Please Create A Job" />
            <AddBottomNavigation
              label="Create Job"
              handleClick={async () => {
                const res = await isUserVerified(_id);
                if (res.data) {
                  router.push("/c-dashboard/job/create-job");
                } else {
                  setMsg(
                    "You are not eligible to create jobs because you are not verified. Kindly upload your Id and do your facial capturing"
                  );
                  setColor("error");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                  setTimeout(() => {
                    router.push("/c-dashboard/verification/id-card");
                  }, 6000);
                }
              }}
            />
          </>
        ) : (
          <>
            <AddBottomNavigation
              label="Create A Job"
              handleClick={() => {
                router.push("/c-dashboard/job/create-job");
              }}
            />
            <Typography variant="h6" sx={{ margin: "1rem 1rem" }}>
              All Pending Jobs
            </Typography>
            {data.map((job: any) => {
              return <JobDetailsAccordion key={job._id} job={job} />;
            })}
          </>
        )}
      </Box>
    </>
  );
}
