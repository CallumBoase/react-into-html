import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import FileRow from './components/FileRow.js';
import SubmitButton from './components/SubmitButton.js';
import { uploadFilesThenCreateDocuments } from './helpers/uploadFilesThenCreateDocuments.js';

const FileUploader = () => {

  const [files, setFiles] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filesData, setFilesData] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((response) => response.json())
      .then((data) => {
        setCategoryOptions(data.results.slice(0, 10).map((item) => item.name));
      });
  }, []);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
    setFilesData(Array.from(event.target.files).map((file) => ({ file, category: '', description: ''})));
  };

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => [...prevFiles].filter((_, i) => i !== index));
  };

  const handleCategoryChange = (index, category) => {
    setFilesData((prevFilesData) => {
      const newFilesData = prevFilesData.map((fileData, i) =>
        i === index ? { ...fileData, category } : fileData
      );
      return newFilesData;
    });
  };

  const handleDescriptionChange = (index, description) => {
    setFilesData((prevFilesData) => {
      const newFilesData = prevFilesData.map((fileData, i) =>
        i === index ? { ...fileData, description } : fileData
      );
      return newFilesData;
    });
  };

  const handleSubmit = async () => {
    await uploadFilesThenCreateDocuments(filesData);
  };

  const allFilesHaveCategory = filesData.every((fileData) => fileData.category !== '');

  return (
    <>
      <input type="file" multiple onChange={handleFileChange} />
      {files.length > 0 && (
        <>
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
                />
              ))}
            </TableBody>
          </Table>
          <SubmitButton isDisabled={!allFilesHaveCategory} onClick={handleSubmit} />
        </>
      )}
    </>
  );
};

export default FileUploader;