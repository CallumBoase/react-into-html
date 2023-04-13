import React from 'react';
import { Select, MenuItem } from '@mui/material';

const CategoryDropdown = ({
	category,
	categoryOptions,
	onCategoryChange,
	isDisabled
}) => {
	return (
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
	);
};

export default CategoryDropdown;