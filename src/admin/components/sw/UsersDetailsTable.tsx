import React, { useState, useMemo, useRef, useEffect } from "react";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { Avatar, IconButton, Typography, Box, AlertColor } from "@mui/material";
import moment from "moment";
import UserDetailsTableActions from "./UserDetailsTableActions";
import ImageDialog from "@/components/dialog/ImageDialog";
import { confirmUpgradePayment, getUserSub, verifyUser } from "@/lib/payment";
import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppBadIcon from "@mui/icons-material/GppBad";
import { BlackAvatar } from "@/components/avatar/DashboardDp";
import ProofOfPaymentImageDialog from "@/components/dialog/ProofOfPaymentImageDialog";
import { theme } from "@/pages/_app";
import GenericDialog from "@/components/dialog/GenericDialog";
import GenericContent from "@/components/dialog/contents/GenericContent";
import GenericActions from "@/components/dialog/actions/GenericActions";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useRouter } from "next/router";

export default function UsersDetailsTable({ users }: { users: any[] }) {
  const [rowId, setRowId] = useState<GridRowId>();
  //get reference to the image dialog box
  const imageDialogRef = useRef();

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
        field: "verification.kycVerified",
        headerName: "Veri. Status",
        renderCell: (param: any) => (
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <VerificationStatus imageDialogRef={imageDialogRef} param={param} />
          </Box>
        ),
      },
      {
        field: "subscription.type",
        headerName: "Sub. Type",
        renderCell: (param: any) => <SubType userId={param.row._id} />,
      },

      {
        field: "subscription.popConfirmed",
        headerName: "Sub. Status",
        width: 120,
        renderCell: (param: any) => (
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <SubStatus imageDialogRef={imageDialogRef} param={param} />
          </Box>
        ),
      },
      {
        field: "subscription.subscribedDate",
        headerName: "Sub. Date",
        renderCell: (param: any) => <SubDate userId={param.row._id} />,
      },
      {
        field: "subscription.expiringDate",
        headerName: "Sub. Exp. Date",
        renderCell: (param: any) => <SubExpiringDate userId={param.row._id} />,
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
    <div style={{ height: "auto", width: "100%" }}>
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

function SubType({ userId }: { userId: string }) {
  const [subType, setSubType] = useState("");
  useEffect(() => {
    (async () => {
      const data = await getUserSub(userId);
      setSubType(data && data.type);
    })();
  });

  return <Typography>{subType ? subType : "Free"}</Typography>;
}
function SubDate({ userId }: { userId: string }) {
  const [subscription, setSubscription] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      const data = await getUserSub(userId);
      setSubscription(data);
    })();
  });

  return (
    <Typography variant="caption">
      {subscription && subscription.subscribedDate
        ? moment(subscription.subscribedDate).format("YYYY/MM/DD")
        : ""}
    </Typography>
  );
}
function SubExpiringDate({ userId }: { userId: string }) {
  const [subscription, setSubscription] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      const data = await getUserSub(userId);
      setSubscription(data);
    })();
  });

  return (
    <Typography variant="caption">
      {subscription && subscription.expiringDate
        ? moment(subscription.expiringDate).format("YYYY/MM/DD")
        : ""}
    </Typography>
  );
}
function SubStatus({
  imageDialogRef,
  param,
}: {
  imageDialogRef: any;
  param: any;
}) {
  useEffect(() => {
    (async () => {
      const data = await getUserSub(param.row._id);
      setSubscription(data);
    })();
  }, [param]);
  const [subscription, setSubscription] = useState<any>(undefined);

  if (subscription && subscription.expiringDate)
    return <VerifiedIcon sx={{ color: "green" }} />;
  if (!subscription || (subscription && subscription.pop === undefined))
    return <p></p>;
  if (
    subscription &&
    subscription.expiringDate &&
    new Date(subscription.expiringDate) < new Date()
  )
    return <ClearIcon />;
  return (
    <>
      <IconButton
        onClick={() => {
          //call image dialog ref to update image dialog
          const refState = imageDialogRef.current as any;

          refState.updateSrc(`/api/multer/sub/${subscription.pop}`);
          refState.showDialog();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {subscription && subscription.pop && (
          <BlackAvatar
            width={50}
            alt=""
            height={50}
            src={`/api/multer/sub/${subscription && subscription.pop}`}
          />
        )}
      </IconButton>
      <ApproveSubscription param={param} />
      <ProofOfPaymentImageDialog ref={imageDialogRef} />
    </>
  );
}

function ApproveSubscription({ param }: { param: any }) {
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const router = useRouter();
  //declare refs
  const dialogRef = useRef();
  //ref for snackbar
  const snackbarRef = useRef();
  const confirmHandler = () => {
    const refState = dialogRef.current as any;
    refState.showDialog();
  };
  //confirm sub pop action
  const confirmUpgradePaymentAction = async (confirm: boolean) => {
    if (!confirm) {
      const refState = dialogRef.current as any;
      refState.closeDialog();
    } else {
      const result = await confirmUpgradePayment(param.row._id);
      const refState = dialogRef.current as any;
      refState.closeDialog();
      if (result) {
        setColor("success");
        setMsg("Subscription approved");
        const refState = snackbarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
          router.reload();
        }, 6000);
      } else {
        setColor("error");
        setMsg("Action not Successful");
        const refState = snackbarRef.current as any;
        refState.handleClick();
      }
    }
  };
  return (
    <>
      {" "}
      <Box display={"none"}>
        <GenericDialog
          content={
            <GenericContent message="Are you sure you want to approve subscription?" />
          }
          actions={
            <GenericActions confirmAction={confirmUpgradePaymentAction} />
          }
          ref={dialogRef}
        />
      </Box>{" "}
      <SnackbarComponent msg={msg} color={color} ref={snackbarRef} />
      <IconButton
        onClick={confirmHandler}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThumbUpIcon sx={{ color: theme.smnk[1200] }} />
      </IconButton>
    </>
  );
}
export function UserDp({ param }: { param: any }) {
  if (!param.row.dpFileName) return <Avatar sx={{ width: 50, height: 50 }} />;
  return (
    <BlackAvatar
      src={`/api/multer/profile-pic/${param.row.dpFileName}`}
      width={50}
      height={50}
      alt="user Dp"
    />
  );
}
export function VerificationStatus({
  imageDialogRef,
  param,
}: {
  imageDialogRef: any;
  param: any;
}) {
  //confirm verification action
  const action = async () => {
    const result = await verifyUser(param.row._id);
    return result;
  };
  if (
    param &&
    !param.row.verification.kycVerified &&
    !param.row.verification.idCardUrl
  )
    return <GppBadIcon sx={{ color: "red" }} />;
  if (param.row.verification.kycVerified)
    return <VerifiedIcon sx={{ color: "green" }} />;
  return (
    <>
      <IconButton
        onClick={async () => {
          //call image dialog ref to update image dialog
          const refState = imageDialogRef.current as any;

          refState.updateSrc(
            `/api/multer/id-card/${param.row.verification.idCardUrl}`,
            param.row.verification.capturedPhotoUrl
          );
          refState.showDialog();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlackAvatar
          width={50}
          alt=""
          height={50}
          src={`/api/multer/id-card/${
            param.row.verification && param.row.verification.idCardUrl
          }`}
        />
      </IconButton>
      <ImageDialog
        receiverId={param.row._id}
        action={action}
        ref={imageDialogRef}
      />
    </>
  );
}
