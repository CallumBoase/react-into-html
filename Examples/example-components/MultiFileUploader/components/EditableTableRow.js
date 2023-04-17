import React from 'react';
import { MenuItem, TableCell, TableRow, TextField, IconButton, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditableTableRow = ({
	props,
	rowProps
}) => {
	return (
		<TableRow>
			{props.columns.map((column) => {

				switch (column.type) {

					case 'readOnly':
						return <TableCell key={column.key}>{documentToCreate[column.key]}</TableCell>

					case 'select':
						return <TableCell key={column.key}>
							<Select
								displayEmpty
								disabled={props.isDisabled}
								value={documentToCreate[column.key]}
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
									value={documentToCreate[column.key]}
									onChange={(event) => props.handleValueChange(rowProps.rowNum, column.key, event.target.value)}
								/>
							</TableCell>
						)
				}
			})}
			<TableCell>
				<IconButton onClick={() => props.handleRemoveRow(rowProps.rowNum)} disabled={props.isDisabled}>
					<CloseIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default EditableTableRow;