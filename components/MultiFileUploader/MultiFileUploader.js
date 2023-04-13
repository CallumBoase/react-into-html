//Import react
import React, { useState, useEffect } from 'react';

//Import the components defined in other files
import FilesTable from './components/FilesTable.js';
import SubmitButton from './components/SubmitButton.js';
import SuccessBanner from './components/SuccessBanner.js';
import ErrorBanner from './components/ErrorBanner.js';

//Import some helper functions related to API calls
import { getMemberOptions } from './helpers/apiCalls.js';
import getMultiChoiceOptionsFromKnackField from './helpers/getMultiChoiceOptionsFromKnackField.js';
import { uploadFilesThenCreateDocuments } from './helpers/uploadFilesThenCreateDocuments.js';

//Global variables
const knackFields = {
  category: 'field_30',
  description: 'field_31',
  member: 'field_33'
}


//Define our component
const FileUploader = () => {

  //Defining state variables
  //Each time a state variable changes, the virtual DOM will re-render
  const [files, setFiles] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  //When the component mounts, we need to get the category options from the API
  //UseEffect called in this way (with an empty array as the second argument) 
  //  Will only run once, when the component mounts
  //Once the category options have been obtained, the categories variable is updated
  //  This causes the virtual DOM to be re-rendered with this new information
  //We include an async function inside like this because it's the recommended way
  //  Rather than using an async function directly as the callback for useEffect
  useEffect(() => {
    // const fetchCategoryOptions = async () => {
    //   const categories = await getCategoryOptions();
    //   setCategoryOptions(categories);
    // };
    // fetchCategoryOptions();
    const categories = getMultiChoiceOptionsFromKnackField(knackFields.category);
    setCategoryOptions(categories);
  }, []);

  //Fetch the member options from Knack
  useEffect(() => {

    const fetchMemberOptions = async () => {
      const members = await getMemberOptions();
      setMemberOptions(members);
    };
    fetchMemberOptions();

  })

  //When the file input changes, we need to update the files and filesData variables
  const handleFileChange = (event) => {
    setFiles(event.target.files);
    setFilesData(Array.from(event.target.files).map((file) => ({ file, category: '', description: '', mmeber: '' })));
  };

  //When the user clicks the remove button, we need to update the files and filesData variables
  const handleFileRemove = (index) => {

    //Update the files variable - get rid of the file corresponding to the removed row
    setFiles((prevFiles) => removeNthItemFromArray(Array.from(prevFiles), index));

    //Update the filesData variable - get rid of the fileData corresponding to the removed row
    setFilesData((prevFilesData) => removeNthItemFromArray(prevFilesData, index));

  };

  //Helper function to remove an item from an array
  function removeNthItemFromArray(array, index) {
    return array.filter((_, i) => i !== index);
  }

  //When the user changes the category for a file, we need to update the filesData variable
  const handleCategoryChange = (index, category) => {
    setFilesData((prevFilesData) => {
      const newFilesData = prevFilesData.map((fileData, i) =>
        i === index ? { ...fileData, category } : fileData
      );
      return newFilesData;
    });
  };

  //When the user changes the member value a file, we need to update the memerData variable
  const handleMemberChange = (index, member) => {
    setFilesData((prevFilesData) => {
      const newFilesData = prevFilesData.map((fileData, i) =>
        i === index ? { ...fileData, member } : fileData
      );
      return newFilesData;
    });
  };

  //When the user changes the description for a file, we need to update the filesData variable
  const handleDescriptionChange = (index, description) => {
    setFilesData((prevFilesData) => {
      const newFilesData = prevFilesData.map((fileData, i) =>
        i === index ? { ...fileData, description } : fileData
      );
      return newFilesData;
    });
  };

  //When a user clicks the submit button, we run API calls to upload the files and create the document records
  //Depending on the result of this, we update the submitStatus variable to 'success' or 'error'
  //We also reset the files state variable to an empty array, which hides the table.
  const handleSubmit = async () => {
    setIsLoading(true);
    Knack.showSpinner();
    const results = await uploadFilesThenCreateDocuments(filesData);
    if (results.failed === 0) {
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
    setIsLoading(false);
    Knack.hideSpinner();
    setFiles([]);
  };

  //When the user clicks a button that runs handleReset
  //We reset the values needed to re-render the virtual DOM in it's starting state
  //This means the table and banners are gone, and the file input is visible again
  const handleReset = () => {
    setFiles([]);
    setFilesData([]);
    setSubmitStatus(null);
  };

  //Logic to help deciding what to render
  //This runs each time the virtual DOM is re-rendered
  //So it controls what shows on the page
  const allFilesHaveCategory = filesData.every((fileData) => fileData.category !== '');
  const showFileInput = files.length === 0 && submitStatus === null;

  //The actual component JSX that gets rendered
  //We are calling a bunch of components defined in separate files, and passing them variables they require
  //We also run some logic to decide what to render
  //Eg {showFileInput && <input type="file" multiple onChange={handleFileChange}/>}
  //  Means that the file input will only be rendered if the showFileInput variable is true
  return (
    <>
      {showFileInput && (
        <input type="file" multiple onChange={handleFileChange} />
      )}
      {files.length > 0 && (
        <>
          <FilesTable
            filesData={filesData}
            categoryOptions={categoryOptions}
            memberOptions={memberOptions}
            handleCategoryChange={handleCategoryChange}
            handleMemberChange={handleMemberChange}
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

//Export out component
export default FileUploader;