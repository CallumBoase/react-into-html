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

//Import MUI theme and styles
import theme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';

//Import some global info
import globals from '../../../globals.js';

//Shortcut to global variables
const knackDocumentObjectFields = globals.Knack.objects.documents.fields;

async function fetchCategories() {
  return await getMultiChoiceOptionsFromKnackField(knackDocumentObjectFields.category);
}

async function fetchMembers() {
  return await getMemberOptions();
}

//value file.name will receive the uploaded file.name if included
//newFileName is a special key - it will set the file name to this upon upload (if not blank)
const columns = [
  { label: 'File', key: 'fileName', type: 'readOnly', value: 'file.name'},
  { label: 'New file name', key: 'newFileName', type: 'text' },
  { label: 'Category', key: 'category', type: 'select', dropdownOptions: fetchCategories },
  { label: 'Member', key: 'member', type: 'select', dropdownOptions: fetchMembers },
  { label: 'Description', key: 'description', type: 'text' }
]

//Define our component
const FileUploader = () => {  

  //Defining state variables
  //Each time a state variable changes, the virtual DOM will re-render
  const [files, setFiles] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [documentsToCreate, setDocumentsToCreate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  columns.forEach(column => {

    //Only needed for column type = select
    if(column.type !== 'select') return;

    //Set up the dropdown options for each <select> column
    if (Array.isArray(column.dropdownOptions)) {

      useEffect(() => {
        const optionsFormatted = formatDropdownOptions(column.dropdownOptions);
        setDropdownOptions((prevDropdownOptions) => ({ ...prevDropdownOptions, [column.key]: optionsFormatted }));
      }, []);

    } else if (typeof column.dropdownOptions === 'function') {

      useEffect(() => {
        const fetchOptions = async () => {
          const options = await column.dropdownOptions();
          const optionsFormatted = formatDropdownOptions(options);
          setDropdownOptions((prevDropdownOptions) => ({ ...prevDropdownOptions, [column.key]: optionsFormatted }));

        };
        fetchOptions();
      }, []);

    }
  })

  //When the file input changes, we need to update the files and documentsToCreate variables
  const updatedocumentsToCreate = (event) => {
    setFiles(event.target.files);
    setDocumentsToCreate(Array.from(event.target.files).map((file) => {

      //We always include the uploaded file under key 'file'
      let documentToCreate = {file: file};

      //We need to create a documentToCreate object for each file
      //Each documentToCreate object needs to have the file value, and empty string for each other column
      //We use the column key to determine the name of the property
      columns.forEach((column) => {

        //Special case: value is file.name, then set it to file name
        if(column.value === 'file.name'){
          documentToCreate[column.key] = file.name;
        } else {
          documentToCreate[column.key] = '';
        }

      });

      return documentToCreate;

    }));
  };

  //When the user clicks the remove button, we need to update the files and documentsToCreate variables
  const removeDocumentToCreate = (index) => {

    //Update the files variable - get rid of the file corresponding to the removed row
    setFiles((prevFiles) => removeNthItemFromArray(Array.from(prevFiles), index));

    //Update the documentsToCreate variable - get rid of the documentsToCreate corresponding to the removed row
    setDocumentsToCreate((prevDocumentsToCreate) => removeNthItemFromArray(prevDocumentsToCreate, index));

  };

  //Helper function to remove an item from an array
  function removeNthItemFromArray(array, index) {
    return array.filter((_, i) => i !== index);
  }

  //When a value in the editable table changes, update the documentsToCreate variable with new data
  const handleValueChange = (index, column, value) => {
    setDocumentsToCreate((prevDocumentsToCreate) => {
      const newDocumentsToCreate = prevDocumentsToCreate.map((documentToCreate, i) =>
        i === index ? { ...documentToCreate, [column]: value } : documentToCreate
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
    columns,
    files,
    dropdownOptions,
    documentsToCreate,
    removeDocumentToCreate,
    handleValueChange,
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
  //We also include <ThemeProvider> for styling, as defined in the theme.js file
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

//Export out component
export default FileUploader;

function formatDropdownOptions(options) {

  let optionsFormatted;

  //Format the options into {id: 'string', identifier: 'string'} objects when possible
  if (options.length && options[0].id && options[0].identifier) {
    //Nothing required - it's already formatted correctly
    optionsFormatted = options;
  } else if (options.length && typeof options[0] === 'string') {
    //Set ID and identifier to the same value
    optionsFormatted = options.map(option => ({ id: option, identifier: option }));
  } else {
    //Unknown format - throw an error
    throw new Error('dropdownOptions must be an array of strings or an array of objects with id and identifier properties');
  }

  return optionsFormatted;

}