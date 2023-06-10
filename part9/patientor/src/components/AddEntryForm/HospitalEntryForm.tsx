import { Box, FormLabel, TextField } from '@mui/material';
import { HospitalEntryWithoutBase } from '../../types';
import BasicDatePicker from '../../lib/BasicDatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface HospitalEntryFormParams {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onDateChange: (date: Dayjs | null) => void;
	values: HospitalEntryWithoutBase;
}

const HospitalEntryForm = (props: HospitalEntryFormParams) => {
	const { onChange, onDateChange, values } = props;
	return (
		<>
			<FormLabel>Hospital Entry</FormLabel>
			<Box sx={{ mt: 1, mb: 1 }}>
				<BasicDatePicker
					label='Discharge Date'
					value={dayjs(values.discharge.date)}
					onChange={onDateChange}
				/>
			</Box>
			<Box sx={{ mt: 1, mb: 1 }}>
				<TextField
					label='Discharge Criteria'
					variant='outlined'
					margin='normal'
					onChange={onChange}
					value={values.discharge.criteria}
				/>
			</Box>
		</>
	);
};

export default HospitalEntryForm;
