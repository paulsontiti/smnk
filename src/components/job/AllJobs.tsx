import { createSetFromArray, fetchJobs } from "@/lib/search";
import React, { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import JobsByCategory from "./JobsByCategory";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";

function AllJobs() {
  const [categories, setCategories] = useState<string[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchJobs();
      setCategories(createSetFromArray(data.flat().sort()));
    })();
  }, []);
  if (!categories) return <LoadingAlert />;
  if (categories.length === 0) return <InfoAlert message="No Jobs Available" />;
  return (
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
  );
}

export default AllJobs;
