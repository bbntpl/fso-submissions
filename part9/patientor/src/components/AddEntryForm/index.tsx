import React, { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';

import {
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	FormLabel,
	OutlinedInput,
	Button
} from '@mui/material';
import { Theme, useTheme, Box } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HospitalEntryForm from './HospitalEntryForm';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalHealthcareEntryForm from './OccupationHealthcareEntryForm';

import patientsService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';

import {
	validateForm,
	FormErrorMessage,
	ErrorKeys
} from './errors';
import {
	Diagnosis,
	Entry,
	EntryWithoutId,
	HealthCheckEntryWithoutBase,
	HealthCheckRating,
	HospitalEntryWithoutBase,
	NewEntry,
	OccupationalHealthcareEntryWithoutBase
} from '../../types';
import BasicDatePicker from '../../lib/BasicDatePicker';
import dayjs from 'dayjs';

interface AddEntryFormParams {
	patientId: string;
	addEntry: (entry: Entry) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, personName: string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

interface EntryFormInitialSate {
	baseEntryInputs: NewEntry;
	occupationalHealthcareInputs: OccupationalHealthcareEntryWithoutBase;
	healthCheckInputs: HealthCheckEntryWithoutBase;
	hospitalInputs: HospitalEntryWithoutBase;
}

const initialState: EntryFormInitialSate = {
	baseEntryInputs: {
		date: new Date().toISOString().slice(0, 10),
		description: '',
		specialist: ''
	},
	occupationalHealthcareInputs: {
		type: 'OccupationalHealthcare',
		employerName: '',
	},
	healthCheckInputs: {
		type: 'HealthCheck',
		healthCheckRating: HealthCheckRating['Healthy']
	},
	hospitalInputs: {
		type: 'Hospital',
		discharge: {
			date: new Date().toISOString().slice(0, 10),
			criteria: ''
		}
	}
}

const AddEntryForm = ({ patientId, addEntry }: AddEntryFormParams) => {
	const theme = useTheme();
	const [formErrors, setFormErrors] = useState<Partial<Record<ErrorKeys, string>>>({});
	const [entryType, setEntryType] = useState<string>('HealthCheck');
	const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
	const [baseEntryInputs, setBaseEntryInputs] =
		useState<NewEntry>(initialState.baseEntryInputs);

	const [healthCheckInputs, setHealthCheckInputs] =
		useState<HealthCheckEntryWithoutBase>(initialState.healthCheckInputs);

	const [occupationalHealthcareInputs, setOccupationHealthcareInputs]
		= useState<OccupationalHealthcareEntryWithoutBase>(initialState.occupationalHealthcareInputs);

	const [hospitalInputs, setHospitalInputs]
		= useState<HospitalEntryWithoutBase>(initialState.hospitalInputs);

	useEffect(() => {
		diagnosesService.getAll().then(data => {
			setDiagnosisCodes(data.map(d => d.code));
		})
	}, [])

	const selectedEntryInputs = (type: string) => {
		switch (type) {
			case 'Hospital':
				return hospitalInputs;
			case 'OccupationalHealthcare':
				return occupationalHealthcareInputs;
			case 'HealthCheck':
				return healthCheckInputs;
			default:
				throw new Error('This entry type does not exists');
		}
	}

	const handleBaseEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBaseEntryInputs({ ...baseEntryInputs, [event.target.name]: event.target.value });
	};

	const handleDateChange = (date: Dayjs | null) => {
		setBaseEntryInputs((prevValues) => ({
			...prevValues,
			date: date ? date.toISOString().slice(0, 10) : prevValues.date,
		}));
	};

	const handleDischargeDateChange = (date: Dayjs | null) => {
		setHospitalInputs((prevValues) => ({
			...prevValues,
			discharge: {
				...prevValues.discharge,
				date: date
					? date.toISOString().slice(0, 10) :
					prevValues.discharge.date
			}
		}));
	};

	const handleStartDateChange = (date: Dayjs | undefined | null) => {
		if (dayjs.isDayjs(date)) {
			setOccupationHealthcareInputs((prevValues) => ({
				...prevValues,
				sickLeave: {
					...prevValues?.sickLeave,
					startDate: date.toISOString().slice(0, 10),
					endDate: prevValues?.sickLeave?.endDate || ''
				}
			}));
		}
	};

	const handleEndDateChange = (date: Dayjs | undefined | null) => {
		if (dayjs.isDayjs(date)) {
			setOccupationHealthcareInputs((prevValues) => ({
				...prevValues,
				sickLeave: {
					...prevValues?.sickLeave,
					endDate: date.toISOString().slice(0, 10),
					startDate: prevValues?.sickLeave?.startDate || ''
				}
			}));
		}
	};

	const handleHospitalEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHospitalInputs({ ...hospitalInputs, [event.target.name]: event.target.value });
	};

	const handleOHEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOccupationHealthcareInputs({ ...occupationalHealthcareInputs, [event.target.name]: event.target.value });
	};

	const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHealthCheckInputs({
			...healthCheckInputs,
			healthCheckRating: HealthCheckRating[event.target.value as keyof typeof HealthCheckRating],
		});
	};

	const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
		const { target: { value } } = event;
		setBaseEntryInputs(prevValues => ({
			...prevValues,
			diagnosisCodes: Array.isArray(value) ? value : [value],
		}));
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const validationErrors = validateForm(baseEntryInputs, healthCheckInputs, occupationalHealthcareInputs, hospitalInputs, entryType);
			if (Object.keys(validationErrors).length > 0) {
				setFormErrors(validationErrors);
				return;
			}

			const newEntry: EntryWithoutId = {
				...baseEntryInputs,
				...selectedEntryInputs(entryType)
			}

			const data = await patientsService.createEntry({ patientId, newEntry })

			addEntry(data);

			const resetFields = () => {
				setBaseEntryInputs(initialState.baseEntryInputs);
				setHealthCheckInputs(initialState.healthCheckInputs);
				setOccupationHealthcareInputs(initialState.occupationalHealthcareInputs);
				setHospitalInputs(initialState.hospitalInputs);
				setFormErrors({});
			}

			resetFields();
		} catch (error: unknown) {
			console.log(error);
		}
	}

	return (
		<form
			style={{ border: '1px solid gray', padding: '5px 10px' }}
			onSubmit={handleSubmit}
		>
			<h3>Add new entry ({entryType})</h3>
			<FormLabel>Base Entry</FormLabel>
			<Box sx={{ mt: 2, mb: 2 }}>
				<BasicDatePicker
					label='Date'
					value={dayjs(baseEntryInputs.date)}
					onChange={handleDateChange}
				/>
			</Box>
			<Box sx={{ mt: 2, mb: 2 }}>
				<TextField
					fullWidth
					label='Description'
					name='description'
					variant='outlined'
					margin='normal'
					value={baseEntryInputs.description}
					onChange={handleBaseEntryChange}
					error={!!formErrors.description}
				/>
				{formErrors.description &&
					<FormErrorMessage>{formErrors.description}</FormErrorMessage>}
			</Box>
			<Box sx={{ mt: 2, mb: 2 }}>
				<TextField
					fullWidth
					label='Specialist'
					name='specialist'
					variant='outlined'
					margin='normal'
					value={baseEntryInputs.specialist}
					onChange={handleBaseEntryChange}
					error={!!formErrors.specialist}
				/>
				{formErrors.specialist &&
					<FormErrorMessage>{formErrors.specialist}</FormErrorMessage>}
			</Box>
			<Box>

				<FormControl sx={{ mt: 2, mb: 2 }}>
					<InputLabel>Diagnosis Codes</InputLabel>
					<Select
						name='diagnosisCodes'
						multiple
						value={baseEntryInputs.diagnosisCodes || []}
						onChange={handleDiagnosisCodesChange}
						input={<OutlinedInput style={{ minWidth: 200 }} label='Code' />}
						MenuProps={MenuProps}
					>
						{diagnosisCodes.map((code) => (
							<MenuItem
								key={code}
								value={code}
								style={getStyles(code, diagnosisCodes, theme)}
							>
								{code}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<FormControl variant='outlined' margin='normal'>
				<InputLabel>Entry Type</InputLabel>
				<Select
					value={entryType}
					onChange={event => setEntryType(event.target.value)}
				>
					<MenuItem value='HealthCheck'>Health Check Entry</MenuItem>
					<MenuItem value='Hospital'>Hospital Entry</MenuItem>
					<MenuItem value='OccupationalHealthcare'>Occupational Healthcare Entry</MenuItem>
				</Select>
			</FormControl>
			<Box sx={{ mt: 2, mb: 2 }}>
				{entryType === 'HealthCheck' &&
					<HealthCheckEntryForm
						onChange={handleHealthCheckRatingChange}
						values={healthCheckInputs}
					/>}
				{entryType === 'Hospital' &&
					<HospitalEntryForm
						onChange={handleHospitalEntryChange}
						onDateChange={handleDischargeDateChange}
						values={hospitalInputs}
					/>}
				{entryType === 'OccupationalHealthcare' &&
					<OccupationalHealthcareEntryForm
						onChange={handleOHEntryChange}
						values={occupationalHealthcareInputs}
						onChangeStartDate={handleStartDateChange}
						onChangeEndDate={handleEndDateChange}
					/>}
			</Box>
			<Button type='submit' variant='outlined'>Submit</Button>
		</form>
	);
};

export default AddEntryForm;