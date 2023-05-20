import { Grid,Typography,Box } from "@mui/material";


function UserCompanyProfileDetails({ profile }: { profile:any }) {

  if (!profile) return <p>loading....</p>;

  return <>
    <Grid container>
        <Grid item xs={12}>
            <Typography sx={{fontWeight:'bold'}}>Company Name:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{profile.name}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography sx={{fontWeight:'bold'}}>State Of Residence:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{profile.state}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography sx={{fontWeight:'bold'}}>LGA Of Residence:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{profile.lga}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography sx={{fontWeight:'bold'}}>Office Address:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{profile.officeAddress}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography sx={{fontWeight:'bold'}}>Bio:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Box>{profile.description}</Box>
        </Grid>
    </Grid>
  </>
}

export default UserCompanyProfileDetails;
