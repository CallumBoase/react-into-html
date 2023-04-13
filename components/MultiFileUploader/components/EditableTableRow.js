import React from 'react';
import { TableCell, TableRow, TextField, IconButton } from '@mui/material';
import CategoryDropdown from './CategoryDropdown.js';
import MemberDropdown from './MemberDropdown.js';
import CloseIcon from '@mui/icons-material/Close';

const EditableTableRow = ({
	file,
	category,
	member,
	description,
	categoryOptions,
	memberOptions,
	onCategoryChange,
	onMemberChange,
	onDescriptionChange,
	removeFileFromFileData,
	isDisabled
}) => {
	return (
		<TableRow>
			<TableCell>{file.name}</TableCell>
			<TableCell>
				<CategoryDropdown
					category={category}
					categoryOptions={categoryOptions}
					onCategoryChange={onCategoryChange}
					isDisabled={isDisabled}
				/>
			</TableCell>
			<TableCell>
				<MemberDropdown 
					member={member}
					memberOptions={memberOptions}
					onMemberChange={onMemberChange}
					isDisabled={isDisabled}
				/>
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
				<IconButton onClick={removeFileFromFileData} disabled={isDisabled}>
					<CloseIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default EditableTableRow;