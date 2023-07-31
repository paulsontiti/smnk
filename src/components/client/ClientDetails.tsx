import React from "react";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import { SmnkErrorBoundary } from "@/pages/_app";

export type Client = {
  createdAt: string;
  email: string;
  phone: string;
  type: string;
  typeClass: string;
  _id: string;
};
function ClientDetails({ client }: { client: Client }) {
  if (!client) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Card>
        <CardContent>
          <h4>SMNK ID: {client._id}</h4>
          <h5>Email:</h5>
          <p>{client.email}</p>
          <h5>Phone Number:</h5>
          <p>{client.phone}</p>
          <h5>Type:</h5>
          <p>{client.type}</p>
          <h5>Class:</h5>
          <p>{client.typeClass}</p>
          <h5>Joined Date:</h5>
          <p>{client.createdAt.slice(0, 10)}</p>
        </CardContent>
        <CardActions>
          <Button>Profile</Button>
        </CardActions>
      </Card>
    </SmnkErrorBoundary>
  );
}

export default ClientDetails;
