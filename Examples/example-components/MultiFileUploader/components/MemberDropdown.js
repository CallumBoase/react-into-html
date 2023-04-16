import React from 'react';
import { Select, MenuItem } from '@mui/material';

const MemberDropdown = ({
	props,
	rowProps
}) => {
	return (
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
	);
};

export default MemberDropdown;