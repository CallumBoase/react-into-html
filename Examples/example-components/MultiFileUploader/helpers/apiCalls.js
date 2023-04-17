import axios from 'axios';
import * as KnackAPI from 'knack-api-helper';
import globals from '../../../../globals.js';

const kn = globals.Knack;

const knackAPI = new KnackAPI({
  auth: 'view-based',
  applicationId: kn.applicationId,
  userToken: window.Knack.getUserToken()
});

export const uploadFile = async (documentToCreate) => {

  const formData = new FormData();

  const extension = documentToCreate.file.name.split('.').pop();
  const newFileName = documentToCreate.newFileName && documentToCreate.newFileName.length > 0 ? documentToCreate.newFileName : null;

  const fileName = newFileName ? `${newFileName}.${extension}` : documentToCreate.file.name;

  formData.append('files', documentToCreate.file, fileName);

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

export const addNewDocumentRecord = async (uploadResult, documentToCreate) => {

  const body = {}
  body[kn.objects.documents.fields.file] = uploadResult.id;
  body[kn.objects.documents.fields.category] = documentToCreate.category;
  body[kn.objects.documents.fields.member] = [documentToCreate.member];
  body[kn.objects.documents.fields.description] = documentToCreate.description;

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
