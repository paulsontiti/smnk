import React from 'react'
import {Rating,Badge} from '@mui/material'
import ApprovalIcon from '@mui/icons-material/Approval';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

function UserRating({rating,level,type}:{type:string,rating:number,level:'Beginner' | 'Intermediate' | 'Pro'}) {
  if(!rating) return <p></p>
  return (
  
    <Badge badgeContent={type === 'skilled worker' && <Level level={level}/>} sx={{mt:2}}>
   <Rating name="read-only" value={rating} readOnly size='small'/>
</Badge>
  )
}

export default UserRating

function Level({level}:{level:'Beginner' | 'Intermediate' | 'Pro'}){

if(level === 'Intermediate') return <LocalPoliceIcon/>
if(level === 'Pro') return <MilitaryTechIcon/>
return <ChildCareIcon/>
}