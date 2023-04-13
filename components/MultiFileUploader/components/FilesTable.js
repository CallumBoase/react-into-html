// FilesTable.js
import React from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import FileRow from './FileRow.js';

const FilesTable = ({
  filesData,
  categoryOptions,
  handleCategoryChange,
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
            description={fileData.description}
            categoryOptions={categoryOptions}
            onCategoryChange={(category) => handleCategoryChange(index, category)}
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