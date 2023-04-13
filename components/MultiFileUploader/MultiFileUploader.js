import React, { useState, useEffect } from 'react';
import FilesTable from './components/FilesTable.js';
import SubmitButton from './components/SubmitButton.js';
import SuccessBanner from './components/SuccessBanner.js';
import ErrorBanner from './components/ErrorBanner.js';
import { uploadFilesThenCreateDocuments } from './helpers/uploadFilesThenCreateDocuments.js';

const FileUploader = () => {

  const [files, setFiles] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    setFilesData((prevFilesData) => [...prevFilesData].filter((_, i) => i !== index));
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
    setIsLoading(true);
    const results = await uploadFilesThenCreateDocuments(filesData);
    if(results.failed === 0){
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
    setIsLoading(false);
    setFiles([]);
  };

  const handleReset = () => {
    setFiles([]);
    setFilesData([]);
    setSubmitStatus(null);
  };

  const allFilesHaveCategory = filesData.every((fileData) => fileData.category !== '');
  const showFileInput = files.length === 0 && submitStatus === null;

  return (
    <>
      {showFileInput && (
        <input type="file" multiple onChange={handleFileChange}/>
      )}
      {files.length > 0 && (
        <>
          <FilesTable
            filesData={filesData}
            categoryOptions={categoryOptions}
            handleCategoryChange={handleCategoryChange}
            handleDescriptionChange={handleDescriptionChange}
            handleFileRemove={handleFileRemove}
            isLoading={isLoading}
          />
          <SubmitButton isDisabled={!allFilesHaveCategory || isLoading} onClick={handleSubmit} />
        </>
      )}
      {submitStatus === 'success' && (
        <SuccessBanner handleReset={handleReset} />
      )}
      {submitStatus === 'error' && (
        <ErrorBanner handleReset={handleReset} />
      )}
    </>
  );
};

export default FileUploader;