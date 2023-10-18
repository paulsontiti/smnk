import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import InfoAlert from "../alerts/Info";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Typography } from "@mui/material";
import LoadingAlert from "../alerts/Loading";
import { SmnkErrorBoundary } from "@/pages/_app";
import CatalogDisplayStepper from "./CatalogDisplayStepper";

function CatalogStepper() {
  const { catalog } = useSelector((state: RootState) => state.swExtra.swExtra);
  const [cat, setCat] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCat(catalog);
  }, [catalog]);
  if (cat === null) return <LoadingAlert />;
  if (cat === undefined || cat.length === 0)
    return (
      <SmnkErrorBoundary>
        <Box mt={5} ml={2}>
          <InfoAlert message="No Catalog. Create one" />{" "}
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              router.push("/dashboard/catalog/add");
            }}
            sx={{
              textTransform: "capitalize",
              m: 2,
            }}
          >
            Create Catalog
          </Button>
        </Box>
      </SmnkErrorBoundary>
    );

  return (
    <Box
      mt={5}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      width={"100%"}
      p={2}
    >
      <Typography variant="h6">Catalogue</Typography>
      <CatalogDisplayStepper catalog={catalog} forClient={false} />
    </Box>
  );
}

export default CatalogStepper;
