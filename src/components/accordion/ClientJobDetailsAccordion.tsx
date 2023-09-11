import Typography from "@mui/material/Typography";
import { Box, CardActions, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AdminJobStatus, { JobStatus, getJobStatus } from "../job/AdminJobStatus";
import Image from "next/image";
import ProposalsAccordion from "./ProposalsAccordion";
import ClientReportsAccordion from "./ClientsReportsAccordion";
import ClientJobDetailsAction from "../bottomNavigation/ClientJobDetailsAction";
import ErrorAlert from "../alerts/Error";
import { fetchUsers } from "@/lib/search";
import InfoAlert from "../alerts/Info";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import JobDetailsCard from "../card/ClientJobDetailsCard";
import SWDetailsNoCollapse from "../card/SWDetailsNoCollapse";
import axios from "axios";
import RecommendedProfAccordion from "./RecommendedProfAccordion";

export default function ClientJobDetailsAccordion({ job }: { job: any }) {
  const { user } = useSelector((state: RootState) => state.users);

  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [error, setError] = React.useState();

  useEffect(() => {
    if (job && user) {
      getJobStatus(job._id, setJobStatus, setError, user._id);
    }
  }, [job, user]);

  if (error) return <ErrorAlert />;
  if (!job || !jobStatus) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Card sx={{ mb: 5, bgcolor: "whitesmoke", color: theme.smnk[1200] }}>
        <CardContent>
          <JobDetailsCard job={job} />
          {!jobStatus.isProposalAccepted && (
            <RecommendedProfAccordion jobId={job._id} />
          )}
          {!job.proposalAccepted && (
            <ProposalsAccordion
              proposals={job.proposals.filter(
                (pro: any) => pro.rejected === false
              )}
              jobId={job._id}
            />
          )}
          {!job.approved && job.reports.length > 0 && (
            <ClientReportsAccordion reports={job.reports} jobId={job._id} />
          )}
        </CardContent>

        <CardActions sx={{ mt: 5 }}>
          {user.type === "admin" ? (
            <>
              {job.pop && !jobStatus.isJobPaidFor && (
                <>
                  <Typography>Proof of Payment</Typography>
                  <Image
                    alt="Proof of payment"
                    src={`/uploads/images/pop/${job.pop}`}
                    width={300}
                    height={300}
                  />
                </>
              )}
              <AdminJobStatus
                jobId={job._id}
                jobStatus={jobStatus}
                isPop={job.pop !== undefined}
              />
            </>
          ) : (
            <Box>
              <ClientJobDetailsAction jobId={job._id} />
            </Box>
          )}
        </CardActions>
      </Card>
    </SmnkErrorBoundary>
  );
}

const getRecommendedProfessionals = async (jobId: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/job/recommended-professionals`,
      data: { jobId },
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
export function RecommendedProfessional({ jobId }: { jobId: string }) {
  const [users, setUsers] = useState<any[] | null>(null);
  useEffect(() => {
    (async () => {
      const data = await getRecommendedProfessionals(jobId);
      setUsers(data);
    })();
  }, [jobId]);
  if (!Array.isArray(users)) return <p></p>;

  if (users.length === 0)
    return <InfoAlert message="No recommended professionals" />;
  return (
    <SmnkErrorBoundary>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={5}
      >
        {users.map((user: any) => (
          <SWDetailsNoCollapse forClient={true} key={user} userId={user} />
        ))}
      </Box>
    </SmnkErrorBoundary>
  );
}
