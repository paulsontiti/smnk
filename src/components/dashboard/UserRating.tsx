import React from 'react'
import {Rating} from '@mui/material'

function UserRating({rating}:{rating:number}) {
  if(!rating) return <p></p>
  return (
    <Rating name="read-only" value={rating} readOnly size='small'/>
  )
}

export default UserRating