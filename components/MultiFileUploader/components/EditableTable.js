// FilesTable.js
import React from 'react';
import { TableRow, TableCell, Table, TableBody, TableHead } from '@mui/material';
import EditableTableRow from './EditableTableRow.js';

const FilesTable = ({
  documentsToCreate,
  categoryOptions,
  memberOptions,
  handleCategoryChange,
  handleMemberChange,
  handleDescriptionChange,
  removeDocumentToCreate,
  isLoading,
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
        {documentsToCreate.map((documentToCreate, index) => (
          <EditableTableRow
            key={index}
            file={documentToCreate.file}
            category={documentToCreate.category}
            member={documentToCreate.member}
            description={documentToCreate.description}
            categoryOptions={categoryOptions}
            memberOptions={memberOptions}
            onCategoryChange={(category) => handleCategoryChange(index, category)}
            onMemberChange={(member) => handleMemberChange(index, member)}
            onDescriptionChange={(description) => handleDescriptionChange(index, description)}
            removeDocumentToCreate={() => removeDocumentToCreate(index)}
            isDisabled={isLoading}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default FilesTable;