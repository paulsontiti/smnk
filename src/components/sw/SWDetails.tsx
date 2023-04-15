import React from 'react'
import {Card,CardActions,CardContent,Button} from '@mui/material'
export type SW = {
    createdAt:string,
    email:string,
    phone:string,
    type:string,
    typeClass:string,
    _id:string,
}
function SWDetails({sw}:{sw:SW}) {
  return (
    <Card>
        <CardContent>
        <h4>SMNK ID: {sw._id}</h4>
            <h5>Email:</h5>
            <p>{sw.email}</p>
            <h5>Phone Number:</h5>
            <p>{sw.phone}</p>
            <h5>Type:</h5>
            <p>{sw.type}</p>
            <h5>Class:</h5>
            <p>{sw.typeClass}</p>
            <h5>Joined Date:</h5>
            <p>{sw.createdAt.slice(0,10)}</p>
        </CardContent>
        <CardActions>
            <Button>Profile</Button>
            <Button>Services</Button>
            <Button>Experience</Button>
        </CardActions>
    </Card>
  )
}

export default SWDetails