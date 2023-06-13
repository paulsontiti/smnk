import Layout from "@/components/dashboard/layout";
import { BankDetails } from "@/lib/types/bank-details";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import InfoAlert from "../alerts/Info";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function UserBankDetails({ userId }: { userId: string }) {
  const { bankDetails } = useSelector((state: RootState) => state.users.user);

  if (!bankDetails.accountName) return <InfoAlert message="No Bank details" />;

  return (
    <>
      <Box>
        <h4>Bank Name:</h4>
        <p>{bankDetails.bankName}</p>
      </Box>
      <Box>
        <h4>Bank Account Name:</h4>
        <p>{bankDetails.accountName}</p>
      </Box>
      <Box>
        <h4>Bank Account Number:</h4>
        <p>{bankDetails.accountNumber}</p>
      </Box>
    </>
  );
}

export default UserBankDetails;
