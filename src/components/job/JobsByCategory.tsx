import { fetchSearchJobs } from "@/lib/search";
import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchedJobDetailsAccordion from "../accordion/SearchedJobDetailsAccordion";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";
import ErrorAlert from "../alerts/Error";

function JobsByCategory({ category }: { category: string }) {
  const [jobs, setJobs] = useState<any[] | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchSearchJobs(category);
      setJobs(data);
      setError(error);
    })();
  }, [category]);

  if (error) return <ErrorAlert />;
  if (!jobs) return <LoadingAlert />;
  if (jobs && jobs.length < 1)
    return <InfoAlert message={`No jobs available in ${category} category`} />;
  return (
    <Container>
      <Typography
        fontWeight={"bold"}
        textTransform={"capitalize"}
        mt={2}
        mb={2}
      >
        {category}
      </Typography>
      {jobs.map((job, i) => (
        <SearchedJobDetailsAccordion job={job} key={i} />
      ))}
    </Container>
  );
}

export default JobsByCategory;
