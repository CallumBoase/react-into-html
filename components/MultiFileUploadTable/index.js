import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import FileRow from './FileRow.js';
import SubmitButton from './SubmitButton.js';
import { uploadFilesCreateRecords } from './uploadFilesCreateRecords.js';

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
    console.log(`handleCategoryChange called with index: ${index} and category: ${category}`);
    setFilesData((prevFilesData) => {
      const newFilesData = prevFilesData.map((fileData, i) =>
        i === index ? { ...fileData, category } : fileData
      );
      console.log('newFilesData:', newFilesData);
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
    console.log('handle submit')
    const data = filesData.map((fileData) => ({
      name: fileData.file.name,
      category: fileData.category,
      description: fileData.description,
    }));
    console.log('data:', data);

    await uploadFilesCreateRecords(filesData);


  };

  const allFilesHaveCategory = filesData.every((fileData) => fileData.category !== '');
  console.log('allFilesHaveCategory:', allFilesHaveCategory);

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