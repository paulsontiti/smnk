
import { Job, getDate } from '@/lib/types/job'
import { Box, Card, CardContent } from '@mui/material'
import React from 'react'
import ApplyForJobButton from './ApplyForJobButton'


function JobDetailsComponent({job}:{job:Job}) {


  return (
    <Card>
       <CardContent>
       <Box>
            <h4>Job Title:  </h4>
            <p>{job.title}</p>
        </Box>
       <Box>
            <h4>Job ID:  </h4>
            <p>{job._id}</p>
        </Box>
        <Box>
            <h4>Job Type:  </h4>
            <p>{job.type}</p>
        </Box>
        <Box>
            <h4>Category:  </h4>
            <p>{job.category}</p>
        </Box>
        <Box>
            <h4>Description:  </h4>
            <p>{job.description}</p>
        </Box>
        <Box>
            <h4>Budget:  </h4>
            <p>{job.budget}</p>
        </Box>
        <Box>
            <h4>State:  </h4>
            <p>{job.state}</p>
        </Box>
        <Box>
            <h4>LGA:  </h4>
            <p>{job.lga}</p>
        </Box>
        
        <Box>
            <h4>Address:  </h4>
            <p>{job.address}</p>
        </Box>
        <Box>
            <h4>Start Date:  </h4>
            <p>{getDate(job.startDate)}</p>
        </Box>
        <Box>
            <h4>End Date:  </h4>
            <p>{getDate(job.endDate)} </p>
        </Box>
        <Box>
            <h4>Agreed To Terms &  Conditions:  </h4>
            <p>{job.agreeToTerms ? 'Yes' :'No'}</p>
        </Box>
       </CardContent>
       <ApplyForJobButton job={job}/>
    </Card>
  )
}

export default JobDetailsComponent