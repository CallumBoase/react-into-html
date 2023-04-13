import React from 'react';
import { TableCell, TableRow, Select, MenuItem, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FileRow = ({ 
	file, 
	category, 
	member,
	description, 
	categoryOptions, 
	memberOptions,
	onCategoryChange,
	onMemberChange,
	onDescriptionChange, 
	onRemove, 
	isDisabled 
}) => {
	console.log(memberOptions);
	return (
		<TableRow>
			<TableCell>{file.name}</TableCell>
			<TableCell>
				<Select
					displayEmpty
					disabled={isDisabled}
					value={category}
					onChange={(event) => onCategoryChange(event.target.value)}
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
				<Select
					displayEmpty
					disabled={isDisabled}
					value={member}
					onChange={(event) => onMemberChange(event.target.value)}
				>
					<MenuItem value="" disabled>
						Member...
					</MenuItem>
					{memberOptions.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option.identifier}
						</MenuItem>
					))}
				</Select>
			</TableCell>
			<TableCell>
				<TextField
					multiline
					minRows={1}
					disabled={isDisabled}
					value={description}
					onChange={(event) => onDescriptionChange(event.target.value)}
				/>
			</TableCell>
			<TableCell>
				<IconButton onClick={onRemove} disabled={isDisabled}>
					<CloseIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default FileRow;