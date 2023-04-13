import { uploadFile, addNewDocumentRecord } from './api.js';

export const uploadFilesCreateRecords = async (filesData) => {
	const uploadPromises = filesData.map(async (fileData) => {
		try {
			const uploadResult = await uploadFile(fileData);
			await addNewDocumentRecord(uploadResult, fileData);
		} catch (error) {
			console.error(error);
		}
	});

	try {
		await Promise.all(uploadPromises);
	} catch (error) {
		console.error(error);
	}
};