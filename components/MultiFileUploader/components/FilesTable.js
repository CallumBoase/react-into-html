// FilesTable.js
import React from 'react';
import { TableCell, Table, TableBody, TableHead, TableRow } from '@mui/material';
import FileRow from './FileRow.js';

const FilesTable = ({
  filesData,
  categoryOptions,
  memberOptions,
  handleCategoryChange,
  handleMemberChange,
  handleDescriptionChange,
  handleFileRemove,
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
          <FileRow
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
            onRemove={() => handleFileRemove(index)}
            isDisabled={isLoading}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default FilesTable;