import {
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@mui/material";
import { getUserProfile } from "@/lib/utils/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfoAlert from "@/components/alerts/Info";

export default function IndividualPersonalInfo() {
  const router = useRouter();
  const [data, setData] = useState<any>();

  const { _id } = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    (async () => {
      const res = await getUserProfile(_id);
      setData(res.data);
    })();
  });

  if (!data) return <InfoAlert message="No personal Info" />;
  return (
    <Box>
      <Card>
        <CardContent>
          <h4>Personal Info</h4>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <span>First Name: </span>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <span>{data.firstName}</span>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <span>Last Name: </span>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <span>{data.lastName}</span>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <span>UserName: </span>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <span>{data.userName}</span>
              <Divider />
            </Grid>
            <Divider />
            <Grid item xs={6}>
              <span>State: </span>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <span>{data.state}</span>
              <Divider />
            </Grid>
            <Divider />
            <Grid item xs={6}>
              <span>L.G.A: </span>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <span>{data.lga}</span>
              <Divider />
            </Grid>
            <Divider />
            <Grid item xs={6}>
              <span>Address: </span>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <span>{data.address}</span>
              <Divider />
            </Grid>
            <Divider />
            <Grid item xs={6}>
              <span>Description: </span>
            </Grid>
            <Grid item xs={6}>
              <p>{data.description}</p>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            size="small"
            onClick={() => {
              router.push(
                "/dashboard/individual/edit-personal-individual-info"
              );
            }}
            variant="contained"
          >
            Edit Info
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
