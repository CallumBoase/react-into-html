
import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ isDisabled, onClick }) => {
	return (

		<Button
			variant="outlined"
			sx={{ mt: '2 !important', px: 3 }}
			disabled={isDisabled}
			onClick={onClick}
		>
			Submit
		</Button>
	);
};

export default SubmitButton;

//Note we add !important to margin top in sx, because Knack is overriding it to 0 margin