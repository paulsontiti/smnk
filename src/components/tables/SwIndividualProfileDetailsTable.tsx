import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Cell } from './ClientDetailsTable';

function createData(
  fieldName: string,
  value: any,
) {
  return { fieldName, value };
}

const createRow=(profile:any)=>{
    const row:any[] = [
        createData('First Name',profile.firstName),
        createData('Last Name',profile.lastName),
        createData('User Name',profile.userName),
        createData('State',profile.state),
        createData('L.G.A',profile.lga),
        createData('Address',profile.address),
        createData('Desc',profile.description),
        createData('Joined Date',moment(profile.createdAt).format("DD/MM/YY"))
    ]
    
    return row
}




export default function SwIndividualProfileDetailsTable({profile}:{profile:any}) {
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
          {createRow(profile).map((row) => (
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