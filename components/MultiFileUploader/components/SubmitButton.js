
import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ isDisabled, onClick }) => {
	return (

		<Button
			variant="outlined"
			sx={{ mt: 2, px: 3 }}
			disabled={isDisabled}
			onClick={onClick}
		>
			Submit
		</Button>
	);
};

export default SubmitButton;