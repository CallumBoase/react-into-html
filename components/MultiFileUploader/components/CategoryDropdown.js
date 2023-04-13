import React from 'react';
import { Select, MenuItem } from '@mui/material';

const CategoryDropdown = ({
	props
}) => {
	return (
		<Select
			displayEmpty
			disabled={props.isDisabled}
			value={props.row.documentToCreate.category}
			onChange={(event) => props.handleCategoryChange(props.row.rowNum, event.target.value)}
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