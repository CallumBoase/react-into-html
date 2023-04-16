import axios from 'axios';
import * as KnackAPI from 'knack-api-helper';
import globals from '../../../../globals.js';

const kn = globals.Knack;

const knackAPI = new KnackAPI({
  auth: 'view-based',
  applicationId: kn.applicationId,
  userToken: window.Knack.getUserToken()
});

export const uploadFile = async (fileData) => {
  const formData = new FormData();
  formData.append('files', fileData.file);

  const response = await axios.post(
    `https://api.knack.com/v1/applications/${kn.applicationId}/assets/file/upload`,
    formData,
    {
      headers: {
        'x-knack-rest-api-key': 'knack',
        'x-knack-application-ID': kn.applicationId,
      },
    }
  );
  return response.data;

};

export const addNewDocumentRecord = async (uploadResult, fileData) => {

  const body = {}
  body[kn.objects.documents.fields.file] = uploadResult.id;
  body[kn.objects.documents.fields.category] = fileData.category;
  body[kn.objects.documents.fields.member] = [fileData.member];
  body[kn.objects.documents.fields.description] = fileData.description;

  const result = await knackAPI.post({
    scene: 'scene_55',
    view: 'view_78',
    body
  });
  return result;

};

export const getMemberOptions = async () => {

  const results = await knackAPI.getMany({
    scene: 'scene_55',
    view: 'view_82',
    format: 'raw'
  });
  const members = results.records.map((record) => {
    return {id: record.id, identifier: record[kn.objects.members.fields.memberName]}
  });
  return members;

};
