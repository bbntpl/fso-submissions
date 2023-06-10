import { Box, FormLabel, TextField } from '@mui/material';
import { OccupationalHealthcareEntryWithoutBase } from '../../types';
import BasicDatePicker from '../../lib/BasicDatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface OccupationalhealthcareEntryFormParams {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeStartDate: (date: Dayjs | undefined | null) => void;
	onChangeEndDate: (date: Dayjs | undefined | null) => void;
	values: OccupationalHealthcareEntryWithoutBase;
}

const OccupationalHealthcareEntryForm = (props: OccupationalhealthcareEntryFormParams) => {
	const {
		onChange,
		values,
		onChangeStartDate,
		onChangeEndDate
	} = props;
	return (
		<>
			<FormLabel>Occupational Healthcare Entry</FormLabel>
			<Box sx={{ mt: 1, mb: 1 }}>
				<TextField
					label='Employer Name'
					name='employerName'
					variant='outlined'
					margin='normal'
					onChange={onChange}
					value={values.employerName}
				/>
			</Box>
			<FormLabel>Sick leave:</FormLabel>
			<Box sx={{ mt: 1, mb: 1 }}>
				<BasicDatePicker
					label='Start Date'
					value={dayjs(values.sickLeave?.startDate)}
					onChange={onChangeStartDate}
					maxDate={dayjs(values?.sickLeave?.endDate)}
				/>
			</Box>
			<Box sx={{ mt: 1, mb: 1 }}>
				<BasicDatePicker
					label='End Date'
					value={dayjs(values.sickLeave?.endDate)}
					onChange={onChangeEndDate}
					minDate={dayjs(values?.sickLeave?.startDate)}
				/>
			</Box>
		</>
	);
};

export default OccupationalHealthcareEntryForm;