import React, { useState } from 'react';
import { TableCell, TableRow, Select, MenuItem, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FileRow = ({ file, category, description, categoryOptions, onCategoryChange, onDescriptionChange, onRemove }) => {

	return (
		<TableRow>
			<TableCell>{file.name}</TableCell>
			<TableCell>
				<Select
					displayEmpty
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
				<TextField
					multiline
					minRows={1}
					value={description}
					onChange={(event) => onDescriptionChange(event.target.value)}
				/>
			</TableCell>
			<TableCell>
				<IconButton onClick={onRemove}>
					<CloseIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default FileRow;