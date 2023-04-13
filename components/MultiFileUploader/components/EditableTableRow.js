import React from 'react';
import { TableCell, TableRow, TextField, IconButton } from '@mui/material';
import CategoryDropdown from './CategoryDropdown.js';
import MemberDropdown from './MemberDropdown.js';
import CloseIcon from '@mui/icons-material/Close';

const EditableTableRow = ({
	props
}) => {
	return (
		<TableRow>
			<TableCell>{props.row.documentToCreate.file.name}</TableCell>
			<TableCell>
				<CategoryDropdown
					props={props}
				/>
			</TableCell>
			<TableCell>
				<MemberDropdown 
					props={props}
				/>
			</TableCell>
			<TableCell>
				<TextField
					multiline
					minRows={1}
					disabled={props.isDisabled}
					value={props.row.documentToCreate.description}
					onChange={(event) => props.handleDescriptionChange(props.row.rowNum, event.target.value)}
				/>
			</TableCell>
			<TableCell>
				<IconButton onClick={() => props.removeDocumentToCreate(props.row.rowNum)} disabled={props.isDisabled}>
					<CloseIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default EditableTableRow;