// FilesTable.js
import React from 'react';
import { TableRow, TableCell, Table, TableBody, TableHead } from '@mui/material';
import EditableTableRow from './EditableTableRow.js';

const EditableTable = ({
  props
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>File</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Member</TableCell>
          <TableCell>Description</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.documentsToCreate.map((documentToCreate, rowNum) => (
          <EditableTableRow
            key={rowNum}
            props={props}
            rowProps={{rowNum, documentToCreate}}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default EditableTable;