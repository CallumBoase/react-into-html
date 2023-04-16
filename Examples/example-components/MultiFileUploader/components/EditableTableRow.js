import React from 'react';
import { TableCell, TableRow, TextField, IconButton, Select } from '@mui/material';
import CategoryDropdown from './CategoryDropdown.js';
import MemberDropdown from './MemberDropdown.js';
import CloseIcon from '@mui/icons-material/Close';

//Trying to refactor columns into this.
//It's getting various errors right now 
//Continue work
//Remember the previous level has columns working for thead
//We'll need to change the config of columns to know what data source to create <options> for under <select>
//Right now we've hard-coded props.memberOptions, but in reality it should be either props.memberOptions or props.categoryOptions
//Also, the .name in the file name column is hard coded since it's file.name, so this will need adjustment

const columns = [
  { label: 'File', key: 'file', type: 'readOnly'},
  { label: 'Category', key: 'category', type: 'select'},
  { label: 'Member', key: 'member', type: 'select'},
  { label: 'Description', key: 'description', type: 'text'}
]

const EditableTableRow = ({
	props,
	rowProps
}) => {
	return (
		<TableRow>
			{columns.map((column) => {
				switch (column.type) {
					case 'readOnly':
						return <TableCell key={column.key}>{rowProps.documentToCreate[column.key].name}</TableCell>
					case 'select':
						return <TableCell key={column.key}>
							<Select
								displayEmpty
								disabled={props.isDisabled}
								value={rowProps.documentToCreate[column.key]}
								onChange={(event) => props.handleValueChange(rowProps.rowNum, column.key, event.target.value)}
							>
								<MenuItem value="" disabled>
									{column.label}...
								</MenuItem>
								{props.memberOptions.map((option) => (
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
									value={rowProps.documentToCreate[column.key]}
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