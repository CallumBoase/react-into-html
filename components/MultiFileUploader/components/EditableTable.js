// FilesTable.js
import React from 'react';
import { TableRow, TableCell, Table, TableBody, TableHead } from '@mui/material';
import EditableTableRow from './EditableTableRow.js';

const FilesTable = ({
  filesData,
  categoryOptions,
  memberOptions,
  handleCategoryChange,
  handleMemberChange,
  handleDescriptionChange,
  removeFileFromFileData,
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
        {filesData.map((fileData, index) => (
          <EditableTableRow
            key={index}
            file={fileData.file}
            category={fileData.category}
            member={fileData.member}
            description={fileData.description}
            categoryOptions={categoryOptions}
            memberOptions={memberOptions}
            onCategoryChange={(category) => handleCategoryChange(index, category)}
            onMemberChange={(member) => handleMemberChange(index, member)}
            onDescriptionChange={(description) => handleDescriptionChange(index, description)}
            removeFileFromFileData={() => removeFileFromFileData(index)}
            isDisabled={isLoading}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default FilesTable;