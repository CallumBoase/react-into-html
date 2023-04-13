import axios from 'axios';
import * as KnackAPI from 'knack-api-helper';

export const uploadFile = async (fileData) => {
  const formData = new FormData();
  formData.append('files', fileData.file);

  const response = await axios.post(
    'https://api.knack.com/v1/applications/642d26891085670027a17157/assets/file/upload',
    formData,
    {
      headers: {
        'x-knack-rest-api-key': 'knack',
        'x-knack-application-ID': '642d26891085670027a17157',
      },
    }
  );
  return response.data;

};

export const addNewDocumentRecord = async (uploadResult, fileData) => {

  const knackAPI = new KnackAPI({
    auth: 'view-based',
    applicationId: '642d26891085670027a17157',
    userToken: Knack.getUserToken()
  });

  const result = await knackAPI.post({
    scene: 'scene_55',
    view: 'view_78',
    body: {
      field_29: uploadResult.id,
      field_30: fileData.description
    }
  });
  return result;

};

export const getCategoryOptions = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type');
  const data = response.data;
  return data.results.slice(0, 10).map((item) => item.name);
};
