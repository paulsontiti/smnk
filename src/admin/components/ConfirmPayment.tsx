import React,{useState} from 'react'
import {Button} from '@mui/material'
import {useRouter} from 'next/router'
import { PaymentDetails, confirmJobPayment, confirmUpgradePayment } from '@/lib/payment'
import {CardActions} from '@mui/material'

function ConfirmPayment({payment}:{payment:any}) {
    
  const router = useRouter()

  const [disableConfirmButton,setDisableConfirmButton] = useState(false)

  return (
    <div>
        {payment.confirm  ? <h4 style={{color:'green',textAlign:'center'}}>Payment Confirmed</h4>
                            : <CardActions>
                            <Button size='small' variant='contained' disabled={disableConfirmButton}
                                    onClick={async ()=>{
                                      setDisableConfirmButton(true)
                                      const id = payment._id as string

                                        let confirm  = false 
                                        if(payment.jobId){
                                           confirm  = await confirmJobPayment(id)
                                        }else{
                                            confirm  = await confirmUpgradePayment(id)
                                        }
                                        if(confirm){
                                          alert('Payment confirmed')
                                          setDisableConfirmButton(false)
                                          router.push('/a-dashboard/payments')
                                        }else{
                                          alert('Payment not confirmed. An Error occurred,try again')
                                          setDisableConfirmButton(false)
                                        }
                                    }}
                            >Comfirm</Button>
                            <Button size='small' variant='contained'
                                    onClick={()=>{
                                      router.push(`/message/${payment.userId}`)
                                    }}
                            >Message Payer</Button>
                          </CardActions>
          }
    </div>
  )
}

export default ConfirmPayment