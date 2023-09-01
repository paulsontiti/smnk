import {
  Box,
  Card,
  CardContent,
  Button,
  CardActions,
  Typography,
  CardHeader,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getCompanyProfile } from "@/lib/utils/user";
import useSWR from "swr";
import { useRouter } from "next/router";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import EditBottomNavigation from "@/components/bottomNavigation/EditBottomNavigation";
import {
  BlackDescription,
  BlackTypography,
} from "@/components/card/ClientJobDetailsCard";

export default function CompanyProfile() {
  const router = useRouter();
  const { _id } = useSelector((state: RootState) => state.users.user);
  const { data, error } = useSWR("getProfile", getCompanyProfile(_id));

  if (error) return <ErrorAlert />;
  if (!data) return <LoadingAlert />;

  return (
    <Box
      mt={5}
      sx={{
        maxWidth: "100%",
        minWidth: "100%",
        p: {
          sm: "3rem 5rem",
          md: "3rem 10rem",
        },
      }}
    >
      <CardHeader title={`Company's Profile`} />
      <BlackTypography label="Name" value={data.name} />
      <BlackTypography label="State" value={data.state} />
      <BlackTypography label="LGA" value={data.lga} />
      <BlackDescription label="Address" description={data.officeAddress} />
      <BlackDescription label="Bio" description={data.description} />

      <CardActions>
        <EditBottomNavigation
          label="Edit Profile"
          handleClick={() => {
            router.push("/dashboard/company/edit-company-profile");
          }}
        />
      </CardActions>
    </Box>
  );
}
