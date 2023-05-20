import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Box } from '@mui/material';

function createData(
  fieldName: string,
  value: any,
) {
  return { fieldName, value };
}

const createRow=(client:any)=>{
    const row:any[] = [
        createData('Email',client.email),
        createData('Phone',client.phone),
        createData('Class',client.typeClass),
        createData('Rating',client.rating),
        createData('Active',client.active.toString()),
        createData('Joined Date',moment(client.createdAt).format("DD/MM/YY"))
    ]
    
    return row
}




export default function ClientDetailsTable({client}:{client:any}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Details</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createRow(client).map((row) => (
            <TableRow
              key={row.fieldName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fieldName}
              </TableCell>
              <TableCell align="right"><Cell value={row.value}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const Cell = ({value}:{value:string})=>{
  return <Box sx={{textOverflow:'ellipsis', width:'200px'}}>{value}</Box>
}