import React from 'react';
import { Select, MenuItem } from '@mui/material';

const CategoryDropdown = ({
	props,
	rowProps
}) => {
	return (
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
	);
};

export default CategoryDropdown;