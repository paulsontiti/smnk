import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { Upgrade } from './upgrade'



const bronze = {
  name:'Bronze',
  price: 1000,
  benefits:[
    'Access to one extra location',
    '20 viewership from clients within your location',
    'Three(3) free adds on Facebook'
  ]
}
export const Bronze = () => {
  return (
    <Card>
      <CardHeader title={bronze.name}/>
      <CardContent>
       <Box>
          <Typography sx={{fontWeight:'bold'}}>{`NGN ${bronze.price}/month`}</Typography>
       </Box>
       <Box>
          <Typography sx={{fontWeight:'bold'}}>Benefits:</Typography>
            <ul>
                {bronze.benefits.map((ben,i)=>(
                  <li key={i}><Typography key={i}>{ben}</Typography></li>
                ))}
            </ul>
            
       </Box>
       
      </CardContent>
      <CardActions>
       <Upgrade visibility='Bronze'/>
      </CardActions>
    </Card>
  )
}