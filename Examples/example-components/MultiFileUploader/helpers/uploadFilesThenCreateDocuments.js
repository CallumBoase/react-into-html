import { uploadFile, addNewDocumentRecord } from './apiCalls.js';

export const uploadFilesThenCreateDocuments = async (documentsToCreate) => {
	const uploadPromises = documentsToCreate.map(async (documentToCreate) => {
		const uploadResult = await uploadFile(documentToCreate);
		await addNewDocumentRecord(uploadResult, documentToCreate);
	});

	const results = await Promise.allSettled(uploadPromises);

	const succeeded = results.filter((result) => result.status === 'fulfilled');
	const failed = results.filter((result) => result.status === 'rejected');

	return {succeeded: succeeded.length, failed: failed.length};

};