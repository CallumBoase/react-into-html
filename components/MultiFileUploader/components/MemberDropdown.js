import React from 'react';
import { Select, MenuItem } from '@mui/material';

const MemberDropdown = ({
	member,
	memberOptions,
	onMemberChange,
	isDisabled
}) => {
	return (
		<Select
			displayEmpty
			disabled={isDisabled}
			value={member}
			onChange={(event) => onMemberChange(event.target.value)}
		>
			<MenuItem value="" disabled>
				Member...
			</MenuItem>
			{memberOptions.map((option) => (
				<MenuItem key={option.id} value={option.id}>
					{option.identifier}
				</MenuItem>
			))}
		</Select>
	);
};

export default MemberDropdown;