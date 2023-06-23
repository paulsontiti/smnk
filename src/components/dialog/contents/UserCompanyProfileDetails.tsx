import { Grid, Typography, Box } from "@mui/material";

function UserCompanyProfileDetails({ profile }: { profile: any }) {
  if (!profile) return <p></p>;

  return (
    <>
      <Grid container rowSpacing={3}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Name:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">{profile.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">
            State Of Residence:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography  variant="caption">{profile.state}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography  variant="subtitle2">LGA Of Residence:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography  variant="caption">{profile.lga}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography  variant="subtitle2">Office Address:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography  variant="caption">{profile.officeAddress}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography  variant="subtitle2">Bio:</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography  variant="caption">{profile.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default UserCompanyProfileDetails;
