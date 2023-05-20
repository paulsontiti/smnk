import { Grid,Typography } from "@mui/material";


function UserIndividualProfileDetails({ profile }: { profile:any }) {

  if (!profile) return <p>loading....</p>;

  return <>
    <Grid container>
        <Grid item xs={4}>
            <Typography>First Name</Typography>
        </Grid>
        <Grid item xs={8}>
            <Typography>{profile.firstName}</Typography>
        </Grid>
    </Grid>
  </>
}

export default UserIndividualProfileDetails;
