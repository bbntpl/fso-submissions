import React from 'react';
import { Box } from '@mui/material';
import { HealthCheckEntryWithoutBase, HealthCheckRating } from '../../types';
import RowRadioButtonsGroup from '../../lib/RowRadioButtonsGroup';

interface HealthCheckEntryFormParams {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	values: HealthCheckEntryWithoutBase;
}

const HealthCheckEntryForm = (props: HealthCheckEntryFormParams) => {
	const { onChange, values } = props;

	return (
		<Box sx={{ mt: 1, mb: 1 }}>
			<RowRadioButtonsGroup
				formLabel='Health Check Rating'
				values={Object.keys(HealthCheckRating).filter((key) => isNaN(Number(key)))}
				value={HealthCheckRating[values.healthCheckRating]}
				onChange={onChange}
			/>
		</Box>
	);
};

export default HealthCheckEntryForm;
