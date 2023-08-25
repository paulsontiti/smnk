import React, { useState, useMemo, useRef, useEffect } from "react";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { Avatar, IconButton, Typography, Skeleton, Box } from "@mui/material";
import moment from "moment";
import ImageDialog from "@/components/dialog/ImageDialog";
import { confirmUpgradePayment, getUserSub } from "@/lib/payment";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { BlackAvatar } from "@/components/avatar/DashboardDp";
import {
  UserDp,
  VerificationStatus,
  WalletStatus,
} from "../sw/UsersDetailsTable";
import UserDetailsTableActions from "../sw/UserDetailsTableActions";

export default function ClientDetailsTable({ users }: { users: any[] }) {
  const [rowId, setRowId] = useState<GridRowId>();
  //get reference to the image dialog box
  const imageDialogRef = useRef();

  //confirm sub pop action
  const action = async (userId: string) => {
    const result = await confirmUpgradePayment(userId);
    return result;
  };

  const columns = useMemo(
    () => [
      //{ field: "_id", headerName: "SMNK ID", width: 300 },
      {
        field: "dpFileName",
        headerName: "Photo",
        renderCell: (param: any) => <UserDp param={param} />,
        sortable: false,
      },
      { field: "email", headerName: "Email", width: 300 },
      { field: "phone", headerName: "Phone" },
      {
        field: "typeClass",
        headerName: "Class",
      },
      {
        field: "active",
        headerName: "Active?",
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Joined Date",
        renderCell: (param: any) =>
          moment(param.row.createdAt).format("YYYY/MM/DD"),
      },
      {
        field: "verification",
        headerName: "Veri. Status",
        renderCell: (param: any) => (
          <VerificationStatus
            verification={param.row.verification}
            userId={param.row._id}
          />
        ),
      },
      {
        field: "wallet",
        headerName: "Wallet POP",
        renderCell: (param: any) => <WalletStatus userId={param.row._id} />,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: any) => (
          <UserDetailsTableActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <div style={{ height: 400, maxHeight: "80vh", width: "100%" }}>
      <DataGrid
        sx={{ margin: "1rem" }}
        getRowId={(row) => row._id}
        rows={users}
        columns={columns}
        getRowSpacing={(param) => ({
          top: param.isFirstVisible ? 0 : 5,
          bottom: param.isLastVisible ? 0 : 5,
        })}
        //onCellEditStart={(params)=>{console.log(params.id)}}
        onCellEditStop={(params) => {
          setRowId(params.id);
        }}

        //processRowUpdate={(newRow,oldRow)=>{setRowId}}
      />
    </div>
  );
}
