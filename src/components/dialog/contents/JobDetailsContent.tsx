import { JobDetails } from "@/components/card/ClientJobDetailsCard";

function JobDetailsContent({ jobId }: { jobId: string }) {
  return <JobDetails jobId={jobId} />;
}

export default JobDetailsContent;
