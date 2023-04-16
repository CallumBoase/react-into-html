import React from 'react';
import { TableCell, TableRow, TextField, IconButton } from '@mui/material';
import CategoryDropdown from './CategoryDropdown.js';
import MemberDropdown from './MemberDropdown.js';
import CloseIcon from '@mui/icons-material/Close';

const EditableTableRow = ({
	props,
	rowProps
}) => {
	return (
		<TableRow>
			<TableCell>{rowProps.documentToCreate.file.name}</TableCell>
			<TableCell>
				<CategoryDropdown
					props={props}
					rowProps={rowProps}
				/>
			</TableCell>
			<TableCell>
				<MemberDropdown 
					props={props}
					rowProps={rowProps}
				/>
			</TableCell>
			<TableCell>
				<TextField
					multiline
					minRows={1}
					disabled={props.isDisabled}
					value={rowProps.documentToCreate.description}
					onChange={(event) => props.handleDescriptionChange(rowProps.rowNum, event.target.value)}
				/>
			</TableCell>
			<TableCell>
				<IconButton onClick={() => props.removeDocumentToCreate(rowProps.rowNum)} disabled={props.isDisabled}>
					<CloseIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default EditableTableRow;