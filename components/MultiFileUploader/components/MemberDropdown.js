import React from 'react';
import { Select, MenuItem } from '@mui/material';

const MemberDropdown = ({
	props
}) => {
	return (
		<Select
			displayEmpty
			disabled={props.isDisabled}
			value={props.row.documentToCreate.member}
			onChange={(event) => props.handleMemberChange(props.row.rowNum, event.target.value)}
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