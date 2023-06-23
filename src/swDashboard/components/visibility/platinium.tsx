import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { Upgrade } from './upgrade'
import { Chip, ListItemButton } from '@mui/material'

const platinium={
  name:'Platinium',
  price:5000,
  benefits:[
    'Own cover page',
    'Access to more locations(states)',
    'Top priority access to clients',
    'Free ads on all our social media handles'
  ]
}

export const Platinium = () => {
  return (
    <Card>
    
    <CardContent>
    <ListItemButton sx={{fontSize:'1.5rem',fontWeight:'bold',mb:'1rem'}}>
      {platinium.name}
      <Chip color='primary' sx={{
          minHeight: 20,
          fontSize: "xs2",
          position: "absolute",
          top: -5,
          ml: 13,
        }} label='Recommended'/>
     
    </ListItemButton>
     <Box>
        <Typography sx={{fontWeight:'bold'}}>{`NGN ${platinium.price}/month`}</Typography>
     </Box>
     <Box>
        <Typography sx={{fontWeight:'bold'}}>Benefits:</Typography>
          <ul>
              {platinium.benefits.map((ben,i)=>(
                <li key={i}><Typography key={i}>{ben}</Typography></li>
                ))}
          </ul>
          
     </Box>
     
    </CardContent>
    <CardActions>
   
     <Upgrade visibility='Platinium'/>
    </CardActions>
  </Card>
  )
}
