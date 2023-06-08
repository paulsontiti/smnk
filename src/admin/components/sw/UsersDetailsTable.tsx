import React, { useState, useMemo, useRef } from "react";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { Avatar, IconButton } from "@mui/material";
import moment from "moment";
import UserDetailsTableActions from "./UserDetailsTableActions";
import ImageDialog from "@/components/dialog/ImageDialog";
import { confirmUpgradePayment } from "@/lib/payment";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

export default function UsersDetailsTable({ users }: { users: any[] }) {
  const [rowId, setRowId] = useState<GridRowId>();
  //get reference to the image dialog box
  const imageDialogRef = useRef();

  //confirm sub pop action
  const action = async (userId: string) => {
    const result = await confirmUpgradePayment(userId);
    return result;
  };

  //check if subscription has expired
  const subExp = (param: any) => {
    if (param.row.subscription.expiringDate) {
      return new Date(param.row.subscription.expiringDate) > new Date();
    }
    return true;
  };

  const columns = useMemo(
    () => [
      //{ field: "_id", headerName: "SMNK ID", width: 300 },
      {
        field: "dpFileName",
        headerName: "Photo",
        renderCell: (param: any) => (
          <Avatar src={`/api/multer/profile-pic/${param.row.dpFileName}`} />
        ),
        sortable: false,
        width: 50,
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
        field: "subscription.type",
        headerName: "Sub. Type",
        renderCell: (param: any) => param.row.subscription.type,
      },

      {
        field: "subscription.popConfirmed",
        headerName: "Sub. Status",
        renderCell: (param: any) =>
          param.row.subscription.popConfirmed && subExp(param) ? (
            <DoneIcon />
          ) : (
            <>
              {param.row.subscription.pop === undefined ? (
                <ClearIcon />
              ) : (
                <>
                  {subExp(param) ? (
                    <>
                      <IconButton
                        onClick={async () => {
                          //call image dialog ref to update image dialog
                          const refState = imageDialogRef.current as any;

                          refState.updateSrc(
                            `/api/multer/sub/${param.row.subscription.pop}`
                          );
                          refState.showDialog();
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Avatar
                          src={`/api/multer/sub/${param.row.subscription.pop}`}
                        />
                      </IconButton>
                      <ImageDialog receiverId={param.row._id}
                        action={() => {
                          return action(param.row._id);
                        }}
                        ref={imageDialogRef}
                      />
                    </>
                  ) : (
                    <ClearIcon />
                  )}
                </>
              )}
            </>
          ),
      },
      {
        field: "subscription.subscribedDate",
        headerName: "Sub. Date",
        renderCell: (param: any) =>
          param.row.subscription.subscribedDate
            ? moment(param.row.subscription.subscribedDate).format("YYYY/MM/DD")
            : "",
      },
      {
        field: "subscription.expiringDate",
        headerName: "Sub. Exp. Date",
        renderCell: (param: any) =>
          param.row.subscription.expiringDate
            ? moment(param.row.subscription.expiringDate).format("YYYY/MM/DD")
            : "",
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
    <div style={{ height: 400, width: "100%" }}>
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
