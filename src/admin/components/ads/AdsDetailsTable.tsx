import React, { useState, useMemo } from "react";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { Avatar, Box } from "@mui/material";
import moment from "moment";

export default function AdsDetailsTable({ ads }: { ads: any[] }) {
  const [rowId, setRowId] = useState<GridRowId>();

  const columns = useMemo(
    () => [
      {
        field: "imgName",
        headerName: "Ad Image",
        renderCell: (param: any) => (
          <Avatar src={`/api/multer/ads/${param.row.imgName}`} />
        ),

        sortable: false,
        width: 150,
      },
      { field: "title", headerName: "Title", width: 300 },
      {
        field: "description",
        headerName: "Description",
        width: 600,
        renderCell: (param: any) => <Box>{param.row.description}</Box>,
      },
      {
        field: "createdAt",
        headerName: "Created Date",
        renderCell: (param: any) =>
          moment(param.row.createdAt).format("DD/MM/YYYY"),
      },
    ],
    []
  );

  return (
    <div style={{ height: "80%", width: "100%" }}>
      <DataGrid
        sx={{ margin: "1rem" }}
        getRowId={(row) => row._id}
        rows={ads}
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
