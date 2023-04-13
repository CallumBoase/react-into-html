import React, { useState, useEffect, useRef } from 'react';
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Select,
	MenuItem,
	TextField,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FileUploader = () => {
	const [files, setFiles] = useState([]);
	const [categories, setCategories] = useState({});
	const [descriptions, setDescriptions] = useState({});
	const [categoryOptions, setCategoryOptions] = useState([]);
	const fileInputRef = useRef();

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/type')
			.then((response) => response.json())
			.then((data) => {
				setCategoryOptions(data.results.slice(0, 10).map((item) => item.name));
			});
	}, []);

	const handleFileChange = (event) => {
		setFiles(event.target.files);
	};

	const handleCategoryChange = (event, index) => {
		setCategories((prevCategories) => ({
			...prevCategories,
			[index]: event.target.value,
		}));
	};

	const handleDescriptionChange = (event, index) => {
		setDescriptions((prevDescriptions) => ({
			...prevDescriptions,
			[index]: event.target.value,
		}));
	};

	const handleFileRemove = (index) => {
		setFiles((prevFiles) => {
			const newFiles = [...prevFiles].filter((_, i) => i !== index);
			const dataTransfer = new DataTransfer();
			newFiles.forEach((file) => dataTransfer.items.add(file));
			fileInputRef.current.files = dataTransfer.files;
			return newFiles;
		});
	};

	const handleSubmit = () => {
		const fileData = [...files].map((file, index) => ({
			fileName: file.name,
			category: categories[index],
			description: descriptions[index],
		}));
		console.log(fileData);
	};

	const allFilesHaveCategory = files.length > 0 && Object.keys(categories).length === files.length;

	return (
		<>
			<input
				type="file"
				multiple
				onChange={handleFileChange}
				ref={fileInputRef}
			/>
			{files.length > 0 && (
				<>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>File</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Description</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{[...files].map((file, index) => (
								<TableRow key={index}>
									<TableCell>{file.name}</TableCell>
									<TableCell>
										<Select
											displayEmpty
											value={categories[index] || ''}
											onChange={(event) => handleCategoryChange(event, index)}
										>
											<MenuItem value="" disabled>
												Category...
											</MenuItem>
											{categoryOptions.map((option) => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</Select>
									</TableCell>
									<TableCell>
										<TextField
											multiline
											minRows={1}
											value={descriptions[index] || ''}
											onChange={(event) =>
												handleDescriptionChange(event, index)
											}
										/>
									</TableCell>
									<TableCell>
										<IconButton onClick={() => handleFileRemove(index)}>
											<CloseIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Button
						disabled={!allFilesHaveCategory}
						onClick={handleSubmit}
						variant="outlined"
						sx={{ mt: 2, px: 3 }}
					>
						Submit
					</Button>
				</>
			)}
		</>
	);
};

export default FileUploader;