import { createSetFromArray, fetchJobs } from "@/lib/search";
import React, { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import JobsByCategory from "./JobsByCategory";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";
import { SmnkErrorBoundary } from "@/pages/_app";

function AllJobs() {
  const [categories, setCategories] = useState<string[] | null | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const data = await fetchJobs();
      if (Array.isArray(data) && data.length > 0) {
        setCategories(createSetFromArray(data.sort()));
      } else {
        setCategories(data);
      }
    })();
  }, []);
  if (categories === undefined) return <LoadingAlert />;
  if (
    categories === null ||
    !Array.isArray(categories) ||
    categories.length === 0
  )
    return <InfoAlert message="No Jobs Available" />;
  return (
    <SmnkErrorBoundary>
      <Container>
        <Typography
          fontWeight={"bold"}
          textTransform={"capitalize"}
          mt={5}
          mb={5}
        >
          All Jobs By Categories
        </Typography>

        {categories.map((category, i) => (
          <JobsByCategory category={category} key={i} />
        ))}
      </Container>
    </SmnkErrorBoundary>
  );
}

export default AllJobs;
