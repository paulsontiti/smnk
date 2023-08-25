import {
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
  CardHeader,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@mui/material";
import { getUserProfile } from "@/lib/utils/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";
import {
  BlackDescription,
  BlackTypography,
} from "@/components/card/ClientJobDetailsCard";

export default function IndividualPersonalInfo() {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);

  const { _id } = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    (async () => {
      const res = await getUserProfile(_id);
      setData(res.data);
    })();
  });
  if (!data) return <LoadingAlert />;
  if (!data.firstName) return <InfoAlert message="No personal Info" />;
  return (
    <Card sx={{ mt: 5, width: "100%" }}>
      <CardHeader title="Personal Info" />
      <CardContent>
        <BlackTypography label="First Name" value={data.firstName} />
        <BlackTypography label="Last Name" value={data.lastName} />
        <BlackTypography label="Username" value={data.userName} />
        <BlackTypography label="State" value={data.state} />
        <BlackTypography label="LGA" value={data.lga} />
        <BlackDescription label="Address" description={data.address} />
        <BlackDescription label="Bio" description={data.description} />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          fullWidth
          sx={{ maxWidth: 300 }}
          size="small"
          onClick={() => {
            router.push("/dashboard/individual/edit-personal-individual-info");
          }}
          variant="contained"
        >
          Edit Info
        </Button>
      </CardActions>
    </Card>
  );
}
