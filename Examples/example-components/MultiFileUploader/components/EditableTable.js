// FilesTable.js
import React from 'react';
import { TableRow, TableCell, Table, TableBody, TableHead } from '@mui/material';
import EditableTableRow from './EditableTableRow.js';

const columns = [
  { label: 'File' },
  { label: 'Category' },
  { label: 'Member' },
  { label: 'Description' }
]

const EditableTable = ({
  props
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell>{column.label}</TableCell>
          ))}
          <TableCell key="Remove" />
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