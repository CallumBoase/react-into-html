import React from 'react';
import { MenuItem, TableCell, TableRow, TextField, IconButton, Select } from '@mui/material';
import CategoryDropdown from './CategoryDropdown.js';
import MemberDropdown from './MemberDropdown.js';
import CloseIcon from '@mui/icons-material/Close';

const EditableTableRow = ({
	props,
	rowProps
}) => {
	return (
		<TableRow>
			{props.columns.map((column) => {
				console.log(column)
				switch (column.type) {
					case 'readOnly':
						return <TableCell key={column.key}>{val(rowProps.documentToCreate, column.key)}</TableCell>
					case 'select':
						return <TableCell key={column.key}>
							<Select
								displayEmpty
								disabled={props.isDisabled}
								value={val(rowProps.documentToCreate, column.key)}
								onChange={(event) => props.handleValueChange(rowProps.rowNum, column.key, event.target.value)}
							>
								<MenuItem value="" disabled>
									{column.label}...
								</MenuItem>
								{props.dropdownOptions[column.key].map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.identifier}
									</MenuItem>
								))}
							</Select>
						</TableCell>
					case 'text':
						return (
							<TableCell key={column.key}>
								<TextField
									multiline
									minRows={1}
									disabled={props.isDisabled}
									value={val(rowProps.documentToCreate, column.key)}
									onChange={(event) => props.handleValueChange(rowProps.rowNum, column.key, event.target.value)}
								/>
							</TableCell>
						)
				}
			})}
			{/* The old version of different columns */}
			{/* <TableCell>{rowProps.documentToCreate.file.name}</TableCell>
			<TableCell>
				<Select
					displayEmpty
					disabled={props.isDisabled}
					value={rowProps.documentToCreate.category}
					onChange={(event) => props.handleValueChange(rowProps.rowNum, 'category', event.target.value)}
				>
					<MenuItem value="" disabled>
						Category...
					</MenuItem>
					{props.categoryOptions.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</TableCell>
			<TableCell>
				<Select
					displayEmpty
					disabled={props.isDisabled}
					value={rowProps.documentToCreate.member}
					onChange={(event) => props.handleValueChange(rowProps.rowNum, 'member', event.target.value)}
				>
					<MenuItem value="" disabled>
						Member...
					</MenuItem>
					{props.memberOptions.map((option) => (
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
					disabled={props.isDisabled}
					value={rowProps.documentToCreate.description}
					onChange={(event) => props.handleValueChange(rowProps.rowNum, 'description', event.target.value)}
				/>
			</TableCell> */}
			<TableCell>
				<IconButton onClick={() => props.removeDocumentToCreate(rowProps.rowNum)} disabled={props.isDisabled}>
					<CloseIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default EditableTableRow;

function val(obj, key) {
    let keys = key.split('.');
    let value = obj;
    for (let i = 0; i < keys.length; i++) {
        value = value[keys[i]];
    }
    return value;
}