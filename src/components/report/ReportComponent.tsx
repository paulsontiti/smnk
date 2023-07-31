import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { SmnkErrorBoundary } from "@/pages/_app";

function ReportComponent({ report }: { report: any }) {
  const router = useRouter();
  if (!report) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Card>
        <CardContent>
          <h4>{report.subject}</h4>
          <h5>Sender Id: </h5>
          <p>{report.senderId}</p>
          <h5>Report:</h5>
          <p>{report.report}</p>
          <Button size="small" sx={{ textTransform: "capitalize" }}>
            Download attached file
          </Button>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            color="success"
            onClick={() => {}}
          >
            Approve
          </Button>
          <Button
            size="small"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            color="warning"
            onClick={() => {
              router.push(`/report/corrections/${report.jobId}`);
            }}
          >
            Correct
          </Button>
          <Button
            size="small"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            color="error"
            onClick={() => {
              router.push(`/report/complaint/${report.jobId}`);
            }}
          >
            Complain
          </Button>
        </CardActions>
      </Card>
    </SmnkErrorBoundary>
  );
}

export default ReportComponent;
