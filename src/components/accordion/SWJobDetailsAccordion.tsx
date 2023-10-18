import { Card, CardActions } from "@mui/material";

import ApplyForJobButton from "../job/ApplyForJobButton";
import ProposalDetailsAccordion from "./ProposalDetailsAccordion";
import { SmnkErrorBoundary } from "@/pages/_app";
import SWJobDetailsCard from "../card/SWJobDetailsCard";

export default function SWJobDetailsAccordion({ job }: { job: any }) {
  return (
    <SmnkErrorBoundary>
      <Card sx={{ minWidth: "98%", maxWidth: "98%" }}>
        <SWJobDetailsCard jobId={job._id} userId={job.userId} forSw={true} />
        <ProposalDetailsAccordion jobId={job._id} />
        <CardActions>
          <ApplyForJobButton job={job} />
        </CardActions>
      </Card>
    </SmnkErrorBoundary>
  );
}
