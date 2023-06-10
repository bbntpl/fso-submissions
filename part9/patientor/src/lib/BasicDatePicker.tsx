import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface DatePickerProps {
	label: string;
	value: Dayjs | undefined | null;
	onChange: (date: Dayjs | null) => void;
	minDate?: Dayjs;
	maxDate?: Dayjs;
}

const BasicDatePicker = (props: DatePickerProps) => {
	const { label, value, onChange, minDate, maxDate } = props;
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				label={label}
				value={value}
				onChange={onChange}
				minDate={minDate ? minDate : undefined}
				maxDate={maxDate ? maxDate : undefined}
			/>
		</LocalizationProvider>
	);
};

export default BasicDatePicker;
