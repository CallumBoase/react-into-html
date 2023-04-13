import { uploadFile, addNewDocumentRecord } from './apiCalls.js';

export const uploadFilesThenCreateDocuments = async (filesData) => {
	const uploadPromises = filesData.map(async (fileData) => {
		const uploadResult = await uploadFile(fileData);
		await addNewDocumentRecord(uploadResult, fileData);
	});

	const results = await Promise.allSettled(uploadPromises);

	const succeeded = results.filter((result) => result.status === 'fulfilled');
	const failed = results.filter((result) => result.status === 'rejected');

	return {succeeded: succeeded.length, failed: failed.length};

};