import { fetchSearchJobs } from "@/lib/search";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchedJobDetailsAccordion from "../accordion/SearchedJobDetailsAccordion";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";
import ErrorAlert from "../alerts/Error";
import { SmnkErrorBoundary } from "@/pages/_app";
import SWJobDetailsCard from "../card/SWJobDetailsCard";

function JobsByCategory({ category }: { category: string }) {
  const [jobs, setJobs] = useState<any[] | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      if (category) {
        const { data, error } = await fetchSearchJobs(category);
        setJobs(data);
        setError(error);
      }
    })();
  }, [category]);

  if (error) return <ErrorAlert />;
  if (!jobs) return <LoadingAlert />;
  if (Array.isArray(jobs) && jobs.length < 1)
    return <InfoAlert message={`No jobs available in ${category} category`} />;
  return (
    <SmnkErrorBoundary>
      <Box minWidth={"100%"}>
        <Typography
          fontWeight={"bold"}
          textTransform={"capitalize"}
          mt={2}
          mb={2}
        >
          {category}
        </Typography>
        <Box
          display={"flex"}
          alignItems={{ xs: "center", sm: "flex-start" }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          flexDirection={{ xs: "column", sm: "row" }}
          flexWrap={"wrap"}
        >
          {jobs.map((job, i) => (
            <SWJobDetailsCard
              userId={job.userId}
              jobId={job._id}
              key={i}
              forSw={false}
            />
          ))}
        </Box>
      </Box>
    </SmnkErrorBoundary>
  );
}

export default JobsByCategory;
