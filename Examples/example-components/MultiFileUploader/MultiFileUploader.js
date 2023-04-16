//Import react
import React, { useState, useEffect } from 'react';

//Import the components defined in other files
import EditableTable from './components/EditableTable.js';
import SubmitButton from './components/SubmitButton.js';
import SuccessBanner from './components/SuccessBanner.js';
import ErrorBanner from './components/ErrorBanner.js';

//Import some helper functions related to API calls
import { getMemberOptions } from './helpers/apiCalls.js';
import getMultiChoiceOptionsFromKnackField from './helpers/getMultiChoiceOptionsFromKnackField.js';
import { uploadFilesThenCreateDocuments } from './helpers/uploadFilesThenCreateDocuments.js';

//Import some global info
import globals from '../../../globals.js';

//Shortcut to global variables
const knackDocumentObjectFields = globals.Knack.objects.documents.fields;


//Define our component
const FileUploader = () => {

  //Defining state variables
  //Each time a state variable changes, the virtual DOM will re-render
  const [files, setFiles] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [documentsToCreate, setDocumentsToCreate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  //Defining our useEffect hooks
  //These are called when the component mounts and when the state variables change

  //Fetch the category options from Knack window object
  useEffect(() => {
    const categories = getMultiChoiceOptionsFromKnackField(knackDocumentObjectFields.category);
    setCategoryOptions(categories);
  }, []);

  //Fetch the member options from Knack API
  useEffect(() => {
    const fetchMemberOptions = async () => {
      const members = await getMemberOptions();
      setMemberOptions(members);
    };
    fetchMemberOptions();
  }, []);

  //When the file input changes, we need to update the files and documentsToCreate variables
  const updatedocumentsToCreate = (event) => {
    setFiles(event.target.files);
    setDocumentsToCreate(Array.from(event.target.files).map((file) => ({ file, category: '', description: '', member: '' })));
  };

  //When the user clicks the remove button, we need to update the files and documentsToCreate variables
  const removeDocumentToCreate = (index) => {

    //Update the files variable - get rid of the file corresponding to the removed row
    setFiles((prevFiles) => removeNthItemFromArray(Array.from(prevFiles), index));
    console.log(files);

    //Update the documentsToCreate variable - get rid of the documentsToCreate corresponding to the removed row
    setDocumentsToCreate((prevDocumentsToCreate) => removeNthItemFromArray(prevDocumentsToCreate, index));
    console.log(documentsToCreate)

  };

  //Helper function to remove an item from an array
  function removeNthItemFromArray(array, index) {
    return array.filter((_, i) => i !== index);
  }

  //When the user changes the category for a file, we need to update the documentsToCreate variable
  const handleCategoryChange = (index, category) => {
    setDocumentsToCreate((prevDocumentsToCreate) => {
      const newDocumentsToCreate = prevDocumentsToCreate.map((documentToCreate, i) =>
        i === index ? { ...documentToCreate, category } : documentToCreate
      );
      return newDocumentsToCreate;
    });
  };

  //When the user changes the member value a file, we need to update the documentsToCreate variable
  const handleMemberChange = (index, member) => {
    setDocumentsToCreate((prevDocumentsToCreate) => {
      const newDocumentsToCreate = prevDocumentsToCreate.map((documentToCreate, i) =>
        i === index ? { ...documentToCreate, member } : documentToCreate
      );
      return newDocumentsToCreate;
    });
  };

  //When the user changes the description for a file, we need to update the documentsToCreate variable
  const handleDescriptionChange = (index, description) => {
    setDocumentsToCreate((prevDocumentsToCreate) => {
      const newDocumentsToCreate = prevDocumentsToCreate.map((documentToCreate, i) =>
        i === index ? { ...documentToCreate, description } : documentToCreate
      );
      return newDocumentsToCreate;
    });
  };

  //When a user clicks the submit button, we run API calls to upload the files and create the document records
  //Depending on the result of this, we update the submitStatus variable to 'success' or 'error'
  //We also reset the files state variable to an empty array, which hides the table.
  const handleSubmit = async () => {
    setIsLoading(true);
    Knack.showSpinner();
    const results = await uploadFilesThenCreateDocuments(documentsToCreate);
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
    setDocumentsToCreate([]);
    setSubmitStatus(null);
  };

  const props = {
    files,
    categoryOptions,
    memberOptions,
    documentsToCreate,
    removeDocumentToCreate,
    handleCategoryChange,
    handleMemberChange,
    handleDescriptionChange,
    handleSubmit,
    handleReset,
    isLoading,
    submitStatus,
  }

  //Logic to help deciding what to render
  //This runs each time the virtual DOM is re-rendered
  //So it controls what shows on the page
  const allFilesHaveCategory = documentsToCreate.every((documentToCreate) => documentToCreate.category !== '');
  const showFileInput = files.length === 0 && submitStatus === null;

  //The actual component JSX that gets rendered
  //We are calling a bunch of components defined in separate files, and passing them variables they require
  //We also run some logic to decide what to render
  //Eg {showFileInput && <input type="file" multiple onChange={updatedocumentsToCreate}/>}
  //  Means that the file input will only be rendered if the showFileInput variable is true
  return (
    <>
      {showFileInput && (
        <input type="file" multiple onChange={updatedocumentsToCreate} />
      )}
      {files.length > 0 && (
        <>
          <EditableTable
            props={props}
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