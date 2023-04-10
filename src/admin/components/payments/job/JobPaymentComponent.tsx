import { JobPaymentDetails } from '@/lib/payment'
import { Box, Card, CardContent, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ConfirmPayment from '../../ConfirmPayment'



function JobPaymentsComponent({payment}:{payment:JobPaymentDetails}) {

  const router = useRouter()

  const [disableConfirmButton,setDisableConfirmButton] = useState(false)

  return (
    <Paper>
      <h3>Payment ID: {payment.jobId}</h3>
      <Card>
          <CardContent>
              <h4>Payment Details</h4>
              <Box>
                  <h5>Bank Name:</h5>
                  <p>{payment.bankName}</p>
              </Box>
              <Box>
                  <h5>Bank Account Name:</h5>
                  <p>{payment.accountName}</p>
              </Box>
              <Box>
                  <h5>Amount Paid:</h5>
                  <p>{payment.amountPaid}</p>
              </Box>
              <Box>
                  <h5>Date Of Payment:</h5>
                  <p>{payment.dop?.toString().slice(0,10)}</p>
              </Box>
          </CardContent>
          <ConfirmPayment payment={payment}/>
      </Card>
      <Card>
          <CardContent>
              <h5>Job Details</h5>
              <Box>
                  
              </Box>
          </CardContent>
      </Card>
      <Card>
          <CardContent>
              <h5>User Details</h5>
              <Box>
                  
              </Box>
          </CardContent>
      </Card>
    </Paper>
  )
}

export default JobPaymentsComponent