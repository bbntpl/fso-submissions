import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface RowRadioButtonsGroupParams {
	formLabel: string;
	values: string[];
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RowRadioButtonsGroup(props: RowRadioButtonsGroupParams) {
	const { formLabel, values, value, onChange } = props;
	return (
		<FormControl sx={{ mt: 1, mb: 1 }}>
			<FormLabel id='demo-row-radio-buttons-group-label'>{formLabel}</FormLabel>
			<RadioGroup
				row
				aria-labelledby='demo-row-radio-buttons-group-label'
				name='row-radio-buttons-group'
				value={value}
				onChange={onChange}
			> {
					values.map(value => {
						return <FormControlLabel
							value={value}
							control={<Radio />}
							label={value}
							key={value}
						/>
					})
				}
			</RadioGroup>
		</FormControl>
	);
}