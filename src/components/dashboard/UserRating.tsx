import React from 'react'
import {Rating,Badge} from '@mui/material'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

function UserRating({type}:{type:string}) {
  return (
  
    <Badge badgeContent={type === 'skilled worker' && <Level level={'Beginner'}/>} sx={{m:2}}>
   <Rating name="read-only" value={1} readOnly size='small'/>
</Badge>
  )
}

export default UserRating

function Level({level}:{level:'Beginner' | 'Intermediate' | 'Pro'}){

if(level === 'Intermediate') return <LocalPoliceIcon/>
if(level === 'Pro') return <MilitaryTechIcon/>
return <ChildCareIcon/>
}