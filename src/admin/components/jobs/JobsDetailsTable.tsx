import React, { useState, useMemo, useRef, useEffect } from "react";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { Avatar, IconButton, Skeleton } from "@mui/material";
import moment from "moment";
import JobsDetailsTableAction from "./JobsDetailsTableAction";
import ImageDialog from "@/components/dialog/ImageDialog";
import { confirmPayment } from "@/lib/payment";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import InfoAlert from "@/components/alerts/Info";
import { ApproveSubscription } from "../sw/UsersDetailsTable";
import ViewOnlyImageDialog from "@/components/dialog/ViewOnlyImageDialog";

export default function JobsDetailsTable({ jobs }: { jobs: any[] }) {
  const [rowId, setRowId] = useState<GridRowId>();

  //get reference to the image dialog box
  const imageDialogRef = useRef();

  const columns = useMemo(
    () => [
      {
        field: "pop",
        headerName: "P.O.P",
        renderCell: (param: any) => (
          <ProofOfPayment param={param} imageDialogRef={imageDialogRef} />
        ),
        sortable: false,
        width: 150,
      },
      {
        field: "jobDetails.title",
        headerName: "Title",
        width: 150,
        renderCell: (param: any) => param.row.jobDetails.title,
      },
      {
        field: "category",
        headerName: "Category",
        width: 200,
        renderCell: (param: any) => param.row.jobDetails.category,
      },
      {
        field: "type",
        headerName: "Type",
        renderCell: (param: any) => param.row.jobDetails.type,
      },
      {
        field: "budget",
        headerName: "Budget",
        renderCell: (param: any) => param.row.jobDetails.budget,
      },
      {
        field: "createdAt",
        headerName: "Created Date",
        renderCell: (param: any) =>
          moment(param.row.createdAt).format("YYYY/MM/DD"),
      },
      {
        field: "proposalAccepted",
        headerName: "Proposal Accepted",
        type: "boolean",
        width: 150,
      },
      {
        field: "popConfirmed",
        headerName: "POP Confirmed",
        type: "boolean",
        width: 150,
      },
      {
        field: "swId",
        headerName: "Started",
        type: "boolean",
        renderCell: (param: any) =>
          param.row.swId && param.row.popConfirmed ? (
            <DoneIcon />
          ) : (
            <ClearIcon />
          ),
      },
      {
        field: "approved",
        headerName: "Approved",
        type: "boolean",
      },
      {
        field: "swPaid",
        headerName: "S.W Paid",
        type: "boolean",
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params: any) => (
          <JobsDetailsTableAction {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );
  if (!jobs)
    return (
      <InfoAlert message="No data. Please refresh the page to start data fetching" />
    );
  return (
    <div style={{ height: 800, maxHeight: "80vh", width: "100%" }}>
      <DataGrid
        sx={{ margin: "1rem" }}
        getRowId={(row) => row._id}
        rows={jobs}
        columns={columns}
        getRowSpacing={(param) => ({
          top: param.isFirstVisible ? 0 : 5,
          bottom: param.isLastVisible ? 0 : 5,
        })}
        //onCellEditStart={(params)=>{console.log(params.id)}}
        onCellEditStop={(params) => {
          setRowId(params.id);
        }}
      />
    </div>
  );
}

function ProofOfPayment({
  imageDialogRef,
  param,
}: {
  imageDialogRef: any;
  param: any;
}) {
  if (!param) return <p></p>;

  const action = async () => {
    const res = await confirmPayment(param.row._id);
    return res;
  };
  return (
    <>
      {param.row.pop ? (
        <>
          <IconButton
            onClick={async () => {
              //call image dialog ref to update image dialog
              const refState = imageDialogRef.current as any;
              refState.updateSrc(`/api/multer/pop/${param.row.pop}`);
              refState.updateForClient(true);
              refState.showDialog();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <Avatar src={`/api/multer/pop/${param.row.pop}`} />
          </IconButton>{" "}
          <ApproveSubscription param={param} action={confirmPayment} />
          <ViewOnlyImageDialog ref={imageDialogRef} />
        </>
      ) : (
        <p></p>
      )}{" "}
    </>
  );
}
